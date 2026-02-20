package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.dto.OrderRequest;
import com.tradesim.trading.entity.*;
import com.tradesim.trading.repository.OrderRepository;
import com.tradesim.trading.repository.PortfolioRepository;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PositionRepository positionRepository;

    @Transactional
    public Order placeOrder(OrderRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Portfolio portfolio = portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));

        BigDecimal totalCost = request.getPrice().multiply(BigDecimal.valueOf(request.getQuantity()));

        if (request.getSide() == OrderSide.BUY) {
            if (portfolio.getCashBalance().compareTo(totalCost) < 0) {
                throw new RuntimeException("Insufficient funds");
            }
            portfolio.setCashBalance(portfolio.getCashBalance().subtract(totalCost));
            portfolio.setInvestedAmount(portfolio.getInvestedAmount().add(totalCost));
            
            Position position = positionRepository.findByUserIdAndSymbol(user.getId(), request.getSymbol())
                    .orElse(null);

            if (position == null) {
                position = Position.builder()
                        .user(user)
                        .symbol(request.getSymbol())
                        .quantity(request.getQuantity())
                        .averagePrice(request.getPrice())
                        .currentPrice(request.getPrice())
                        .investedAmount(totalCost)
                        .currentValue(totalCost)
                        .pnl(BigDecimal.ZERO)
                        .pnlPercentage(BigDecimal.ZERO)
                        .build();
            } else {
                int newQty = position.getQuantity() + request.getQuantity();
                BigDecimal newAvgPrice = position.getAveragePrice()
                        .multiply(BigDecimal.valueOf(position.getQuantity()))
                        .add(totalCost)
                        .divide(BigDecimal.valueOf(newQty), 2, BigDecimal.ROUND_HALF_UP);

                position.setQuantity(newQty);
                position.setAveragePrice(newAvgPrice);
                position.setCurrentPrice(request.getPrice());
                position.setInvestedAmount(newAvgPrice.multiply(BigDecimal.valueOf(newQty)));
                position.setCurrentValue(request.getPrice().multiply(BigDecimal.valueOf(newQty)));
                position.setPnl(position.getCurrentValue().subtract(position.getInvestedAmount()));
                if (position.getInvestedAmount().compareTo(BigDecimal.ZERO) > 0) {
                    position.setPnlPercentage(position.getPnl().divide(position.getInvestedAmount(), 4, BigDecimal.ROUND_HALF_UP).multiply(BigDecimal.valueOf(100)));
                }
            }
            positionRepository.save(position);

        } else {
            Position position = positionRepository.findByUserIdAndSymbol(user.getId(), request.getSymbol())
                    .orElseThrow(() -> new RuntimeException("No position found to sell"));

            if (position.getQuantity() < request.getQuantity()) {
                throw new RuntimeException("Insufficient quantity to sell");
            }

            portfolio.setCashBalance(portfolio.getCashBalance().add(totalCost));
            portfolio.setInvestedAmount(portfolio.getInvestedAmount().subtract(
                    position.getAveragePrice().multiply(BigDecimal.valueOf(request.getQuantity()))));

            position.setQuantity(position.getQuantity() - request.getQuantity());
            if (position.getQuantity() == 0) {
                positionRepository.delete(position);
            } else {
                positionRepository.save(position);
            }
        }

        portfolioRepository.save(portfolio);

        Order order = Order.builder()
                .user(user)
                .symbol(request.getSymbol())
                .orderType(request.getOrderType())
                .side(request.getSide())
                .quantity(request.getQuantity())
                .price(request.getPrice())
                .status(OrderStatus.FILLED)
                .build();

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
}
