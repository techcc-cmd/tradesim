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
public class PriceAlertRequest {
    private String symbol;
    private BigDecimal targetPrice;
    private String conditionType; // ABOVE, BELOW
}
