package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.trading.entity.Stock;
import com.tradesim.trading.service.StockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
public class StockController {

    private final StockService stockService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Stock>>> getAllStocks() {
        List<Stock> stocks = stockService.getAllStocks();
        return ResponseEntity.ok(ApiResponse.success("Stocks retrieved", stocks));
    }

    @GetMapping("/{symbol}")
    public ResponseEntity<ApiResponse<Stock>> getStock(@PathVariable String symbol) {
        Stock stock = stockService.getStockBySymbol(symbol);
        return ResponseEntity.ok(ApiResponse.success("Stock retrieved", stock));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Stock>>> searchStocks(@RequestParam String query) {
        List<Stock> stocks = stockService.searchStocks(query);
        return ResponseEntity.ok(ApiResponse.success("Search results", stocks));
    }
}
