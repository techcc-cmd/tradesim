package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Watchlist;
import com.tradesim.trading.repository.WatchlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final UserRepository userRepository;

    public List<String> getUserWatchlist(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return watchlistRepository.findByUserId(user.getId())
                .stream()
                .map(Watchlist::getSymbol)
                .collect(Collectors.toList());
    }

    @Transactional
    public void addToWatchlist(String username, String symbol) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        if (watchlistRepository.findByUserIdAndSymbol(user.getId(), symbol).isEmpty()) {
            Watchlist watchlist = Watchlist.builder()
                    .user(user)
                    .symbol(symbol)
                    .build();
            watchlistRepository.save(watchlist);
        }
    }

    @Transactional
    public void removeFromWatchlist(String username, String symbol) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        watchlistRepository.deleteByUserIdAndSymbol(user.getId(), symbol);
    }
}
