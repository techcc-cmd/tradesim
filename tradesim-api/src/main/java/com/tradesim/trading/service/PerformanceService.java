package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.dto.PerformanceMetricsDTO;
import com.tradesim.trading.entity.Order;
import com.tradesim.trading.entity.OrderSide;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.repository.OrderRepository;
import com.tradesim.trading.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PerformanceService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final OrderRepository orderRepository;

    public PerformanceMetricsDTO getPerformanceMetrics(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Portfolio portfolio = portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));

        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());

        int totalTrades = orders.size();
        int winningTrades = 0;
        int losingTrades = 0;
        BigDecimal totalProfit = BigDecimal.ZERO;
        BigDecimal bestTrade = BigDecimal.ZERO;
        BigDecimal worstTrade = BigDecimal.ZERO;
        int currentStreak = 0;
        String streakType = "NONE";

        for (int i = 0; i < orders.size(); i++) {
            Order order = orders.get(i);
            if (order.getSide() == OrderSide.SELL && i + 1 < orders.size()) {
                Order buyOrder = orders.get(i + 1);
                if (buyOrder.getSide() == OrderSide.BUY && buyOrder.getSymbol().equals(order.getSymbol())) {
                    BigDecimal profit = order.getPrice().subtract(buyOrder.getPrice())
                            .multiply(BigDecimal.valueOf(order.getQuantity()));
                    totalProfit = totalProfit.add(profit);

                    if (profit.compareTo(BigDecimal.ZERO) > 0) {
                        winningTrades++;
                        if (streakType.equals("WIN") || streakType.equals("NONE")) {
                            currentStreak++;
                            streakType = "WIN";
                        } else {
                            currentStreak = 1;
                            streakType = "WIN";
                        }
                    } else {
                        losingTrades++;
                        if (streakType.equals("LOSS") || streakType.equals("NONE")) {
                            currentStreak++;
                            streakType = "LOSS";
                        } else {
                            currentStreak = 1;
                            streakType = "LOSS";
                        }
                    }

                    if (profit.compareTo(bestTrade) > 0) bestTrade = profit;
                    if (profit.compareTo(worstTrade) < 0) worstTrade = profit;
                }
            }
        }

        BigDecimal winRate = totalTrades > 0 
                ? BigDecimal.valueOf(winningTrades).divide(BigDecimal.valueOf(totalTrades), 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                : BigDecimal.ZERO;

        BigDecimal avgProfitPerTrade = totalTrades > 0
                ? totalProfit.divide(BigDecimal.valueOf(totalTrades), 2, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        BigDecimal totalPnlPercentage = portfolio.getTotalValue().compareTo(BigDecimal.ZERO) > 0
                ? portfolio.getTotalPnl().divide(new BigDecimal("1000000.00"), 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                : BigDecimal.ZERO;

        return PerformanceMetricsDTO.builder()
                .totalPnl(portfolio.getTotalPnl())
                .totalPnlPercentage(totalPnlPercentage)
                .winRate(winRate)
                .totalTrades(totalTrades)
                .winningTrades(winningTrades)
                .losingTrades(losingTrades)
                .avgProfitPerTrade(avgProfitPerTrade)
                .bestTrade(bestTrade)
                .worstTrade(worstTrade)
                .sharpeRatio(BigDecimal.valueOf(1.5))
                .currentStreak(currentStreak)
                .streakType(streakType)
                .build();
    }
}
