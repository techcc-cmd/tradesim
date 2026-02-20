package com.tradesim.trading.repository;

import com.tradesim.trading.entity.PriceAlert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriceAlertRepository extends JpaRepository<PriceAlert, Long> {
    List<PriceAlert> findByUserIdAndActiveTrue(Long userId);
    List<PriceAlert> findBySymbolAndActiveTrue(String symbol);
}
