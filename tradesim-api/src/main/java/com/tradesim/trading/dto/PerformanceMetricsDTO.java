package com.tradesim.trading.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceMetricsDTO {
    private BigDecimal totalPnl;
    private BigDecimal totalPnlPercentage;
    private BigDecimal winRate;
    private Integer totalTrades;
    private Integer winningTrades;
    private Integer losingTrades;
    private BigDecimal avgProfitPerTrade;
    private BigDecimal bestTrade;
    private BigDecimal worstTrade;
    private BigDecimal sharpeRatio;
    private Integer currentStreak;
    private String streakType;
}
