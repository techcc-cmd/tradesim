package com.tradesim.gamification.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.gamification.dto.RiskScoreDTO;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.entity.Position;
import com.tradesim.trading.repository.PortfolioRepository;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskScoreService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PositionRepository positionRepository;

    public RiskScoreDTO calculateRiskScore(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Portfolio portfolio = portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));
        
        List<Position> positions = positionRepository.findByUserId(user.getId());
        
        int positionCount = positions.size();
        int diversificationScore = calculateDiversificationScore(positionCount);
        int concentrationRisk = calculateConcentrationRisk(positions, portfolio);
        int riskScore = (diversificationScore + concentrationRisk) / 2;
        
        String riskLevel = getRiskLevel(riskScore);
        String recommendation = getRecommendation(riskScore, positionCount);
        
        return RiskScoreDTO.builder()
                .riskScore(riskScore)
                .riskLevel(riskLevel)
                .diversificationScore(diversificationScore)
                .positionCount(positionCount)
                .recommendation(recommendation)
                .build();
    }

    private int calculateDiversificationScore(int positionCount) {
        if (positionCount == 0) return 0;
        if (positionCount == 1) return 20;
        if (positionCount <= 3) return 40;
        if (positionCount <= 5) return 60;
        if (positionCount <= 8) return 80;
        return 100;
    }

    private int calculateConcentrationRisk(List<Position> positions, Portfolio portfolio) {
        if (positions.isEmpty()) return 100;
        
        BigDecimal totalValue = portfolio.getTotalValue();
        if (totalValue.compareTo(BigDecimal.ZERO) == 0) return 100;
        
        BigDecimal maxPositionValue = positions.stream()
                .map(p -> p.getCurrentPrice().multiply(BigDecimal.valueOf(p.getQuantity())))
                .max(BigDecimal::compareTo)
                .orElse(BigDecimal.ZERO);
        
        BigDecimal concentration = maxPositionValue.divide(totalValue, 4, RoundingMode.HALF_UP);
        
        if (concentration.compareTo(new BigDecimal("0.5")) > 0) return 20;
        if (concentration.compareTo(new BigDecimal("0.3")) > 0) return 40;
        if (concentration.compareTo(new BigDecimal("0.2")) > 0) return 60;
        if (concentration.compareTo(new BigDecimal("0.1")) > 0) return 80;
        return 100;
    }

    private String getRiskLevel(int score) {
        if (score >= 80) return "LOW";
        if (score >= 60) return "MODERATE";
        if (score >= 40) return "HIGH";
        return "VERY HIGH";
    }

    private String getRecommendation(int score, int positionCount) {
        if (score >= 80) return "Your portfolio is well-diversified. Keep it up!";
        if (score >= 60) return "Consider adding more stocks to improve diversification.";
        if (positionCount <= 2) return "High risk! Diversify by adding more stocks.";
        return "Very high risk! Reduce concentration in single stocks.";
    }
}
