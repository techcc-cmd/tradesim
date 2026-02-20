package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.trading.entity.Watchlist;
import com.tradesim.trading.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<String>>> getWatchlist(Authentication auth) {
        List<String> symbols = watchlistService.getUserWatchlist(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Watchlist retrieved", symbols));
    }

    @PostMapping("/{symbol}")
    public ResponseEntity<ApiResponse<String>> addToWatchlist(@PathVariable String symbol, Authentication auth) {
        watchlistService.addToWatchlist(auth.getName(), symbol);
        return ResponseEntity.ok(ApiResponse.success("Added to watchlist", symbol));
    }

    @DeleteMapping("/{symbol}")
    public ResponseEntity<ApiResponse<String>> removeFromWatchlist(@PathVariable String symbol, Authentication auth) {
        watchlistService.removeFromWatchlist(auth.getName(), symbol);
        return ResponseEntity.ok(ApiResponse.success("Removed from watchlist", symbol));
    }
}
