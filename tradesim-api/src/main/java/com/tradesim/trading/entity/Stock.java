package com.tradesim.trading.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "market_stocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String symbol;

    @Column(nullable = false)
    private String name;

    @Column(precision = 10, scale = 2)
    private BigDecimal currentPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal openPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal highPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal lowPrice;

    @Column(precision = 10, scale = 2)
    private BigDecimal previousClose;

    @Column(name = "change_percent", precision = 5, scale = 2)
    private BigDecimal changePercent;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
