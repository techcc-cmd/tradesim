package com.tradesim.gamification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardDTO {
    private Long userId;
    private String username;
    private BigDecimal portfolioValue;
    private BigDecimal totalPnl;
    private BigDecimal roiPercentage;
    private Integer rank;
    private Integer totalTrades;
}
