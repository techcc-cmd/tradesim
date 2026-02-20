package com.tradesim.trading.entity;

import com.tradesim.entity.User;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "portfolios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "total_value", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal totalValue = new BigDecimal("1000000.00");

    @Column(name = "cash_balance", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal cashBalance = new BigDecimal("1000000.00");

    @Column(name = "invested_amount", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal investedAmount = BigDecimal.ZERO;

    @Column(name = "total_pnl", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal totalPnl = BigDecimal.ZERO;

    @Column(name = "daily_pnl", precision = 15, scale = 2)
    @Builder.Default
    private BigDecimal dailyPnl = BigDecimal.ZERO;

    @Column(name = "roi_percentage", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal roiPercentage = BigDecimal.ZERO;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}

