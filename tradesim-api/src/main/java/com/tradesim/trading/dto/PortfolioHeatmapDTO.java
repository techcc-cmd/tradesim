package com.tradesim.trading.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioHeatmapDTO {
    private List<HeatmapItem> items;
    private BigDecimal totalValue;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HeatmapItem {
        private String symbol;
        private String name;
        private BigDecimal value;
        private BigDecimal percentage;
        private BigDecimal pnl;
        private BigDecimal pnlPercentage;
        private String color;
    }
}
