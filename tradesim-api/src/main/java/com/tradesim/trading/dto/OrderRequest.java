package com.tradesim.trading.dto;

import com.tradesim.trading.entity.OrderSide;
import com.tradesim.trading.entity.OrderType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderRequest {
    private String symbol;
    private OrderType orderType;
    private OrderSide side;
    private Integer quantity;
    private BigDecimal price;
}
