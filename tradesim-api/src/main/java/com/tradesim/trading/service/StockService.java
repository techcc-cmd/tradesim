package com.tradesim.trading.service;

import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.trading.entity.Stock;
import com.tradesim.trading.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StockService {

    private final StockRepository stockRepository;
    private final Random random = new Random();

    public List<Stock> getAllStocks() {
        List<Stock> stocks = stockRepository.findAll();
        return stocks.stream().map(this::updatePrice).collect(Collectors.toList());
    }

    public Stock getStockBySymbol(String symbol) {
        Stock stock = stockRepository.findBySymbol(symbol)
                .orElseThrow(() -> new ResourceNotFoundException("Stock not found"));
        return updatePrice(stock);
    }

    public List<Stock> searchStocks(String query) {
        return stockRepository.findAll().stream()
                .filter(s -> s.getSymbol().contains(query.toUpperCase()) || 
                            s.getName().toUpperCase().contains(query.toUpperCase()))
                .map(this::updatePrice)
                .collect(Collectors.toList());
    }

    private Stock updatePrice(Stock stock) {
        double change = (random.nextDouble() - 0.5) * 0.02;
        BigDecimal newPrice = stock.getCurrentPrice()
                .multiply(BigDecimal.valueOf(1 + change))
                .setScale(2, RoundingMode.HALF_UP);
        
        stock.setCurrentPrice(newPrice);
        
        BigDecimal changePercent = newPrice.subtract(stock.getPreviousClose())
                .divide(stock.getPreviousClose(), 4, RoundingMode.HALF_UP)
                .multiply(BigDecimal.valueOf(100))
                .setScale(2, RoundingMode.HALF_UP);
        
        stock.setChangePercent(changePercent);
        
        return stock;
    }
}
