package com.tradesim.gamification.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.gamification.entity.Achievement;
import com.tradesim.gamification.repository.AchievementRepository;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.repository.OrderRepository;
import com.tradesim.trading.repository.PortfolioRepository;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final OrderRepository orderRepository;
    private final PositionRepository positionRepository;

    public List<Achievement> getUserAchievements(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return achievementRepository.findByUserId(user.getId());
    }

    @Transactional
    public List<Achievement> checkAndAwardAchievements(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        List<Achievement> newAchievements = new ArrayList<>();
        
        // First Trade
        if (!achievementRepository.existsByUserIdAndBadge(user.getId(), "FIRST_TRADE")) {
            long orderCount = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
            if (orderCount >= 1) {
                newAchievements.add(awardBadge(user, "FIRST_TRADE", "First Trade", "Completed your first trade!"));
            }
        }
        
        // Active Trader (10 trades)
        if (!achievementRepository.existsByUserIdAndBadge(user.getId(), "ACTIVE_TRADER")) {
            long orderCount = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
            if (orderCount >= 10) {
                newAchievements.add(awardBadge(user, "ACTIVE_TRADER", "Active Trader", "Completed 10 trades!"));
            }
        }
        
        // Diversified (5+ positions)
        if (!achievementRepository.existsByUserIdAndBadge(user.getId(), "DIVERSIFIED")) {
            long positionCount = positionRepository.findByUserId(user.getId()).size();
            if (positionCount >= 5) {
                newAchievements.add(awardBadge(user, "DIVERSIFIED", "Diversification Expert", "Hold 5 different stocks!"));
            }
        }
        
        // Portfolio Millionaire
        if (!achievementRepository.existsByUserIdAndBadge(user.getId(), "MILLIONAIRE")) {
            Portfolio portfolio = portfolioRepository.findByUserId(user.getId()).orElse(null);
            if (portfolio != null && portfolio.getTotalValue().compareTo(new BigDecimal("1000000")) >= 0) {
                newAchievements.add(awardBadge(user, "MILLIONAIRE", "Portfolio Millionaire", "Portfolio value reached ₹10,00,000!"));
            }
        }
        
        return newAchievements;
    }

    private Achievement awardBadge(User user, String badge, String title, String description) {
        Achievement achievement = Achievement.builder()
                .user(user)
                .badge(badge)
                .title(title)
                .description(description)
                .build();
        return achievementRepository.save(achievement);
    }
}
