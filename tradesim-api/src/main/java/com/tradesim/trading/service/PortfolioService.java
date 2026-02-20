package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.entity.Position;
import com.tradesim.trading.repository.PortfolioRepository;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final PositionRepository positionRepository;
    private final UserRepository userRepository;

    public Portfolio getUserPortfolio(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));
    }

    public List<Position> getUserPositions(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return positionRepository.findByUserId(user.getId());
    }

    @Transactional
    public Portfolio addFunds(String username, BigDecimal amount) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Portfolio portfolio = portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));

        portfolio.setCashBalance(portfolio.getCashBalance().add(amount));
        portfolio.setTotalValue(portfolio.getTotalValue().add(amount));

        return portfolioRepository.save(portfolio);
    }

    @Transactional
    public Portfolio createPortfolio(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Portfolio portfolio = Portfolio.builder()
                .user(user)
                .totalValue(new BigDecimal("1000000.00"))
                .cashBalance(new BigDecimal("1000000.00"))
                .investedAmount(BigDecimal.ZERO)
                .totalPnl(BigDecimal.ZERO)
                .dailyPnl(BigDecimal.ZERO)
                .roiPercentage(BigDecimal.ZERO)
                .build();

        return portfolioRepository.save(portfolio);
    }
}
