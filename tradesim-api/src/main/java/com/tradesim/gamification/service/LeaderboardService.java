package com.tradesim.gamification.service;

import com.tradesim.gamification.dto.LeaderboardDTO;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.repository.OrderRepository;
import com.tradesim.trading.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final PortfolioRepository portfolioRepository;
    private final OrderRepository orderRepository;

    public List<LeaderboardDTO> getLeaderboard() {
        List<Portfolio> portfolios = portfolioRepository.findAll();
        
        AtomicInteger rank = new AtomicInteger(1);
        
        return portfolios.stream()
                .sorted((p1, p2) -> p2.getTotalValue().compareTo(p1.getTotalValue()))
                .limit(100)
                .map(portfolio -> {
                    int totalTrades = orderRepository.findByUserIdOrderByCreatedAtDesc(portfolio.getUser().getId()).size();
                    return LeaderboardDTO.builder()
                            .userId(portfolio.getUser().getId())
                            .username(portfolio.getUser().getUsername())
                            .portfolioValue(portfolio.getTotalValue())
                            .totalPnl(portfolio.getTotalPnl())
                            .roiPercentage(portfolio.getRoiPercentage())
                            .rank(rank.getAndIncrement())
                            .totalTrades(totalTrades)
                            .build();
                })
                .collect(Collectors.toList());
    }
}
