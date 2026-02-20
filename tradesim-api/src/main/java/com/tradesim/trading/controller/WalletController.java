package com.tradesim.trading.controller;

import com.tradesim.entity.User;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Wallet;
import com.tradesim.trading.repository.WalletRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    public WalletController(WalletRepository walletRepository,
                            UserRepository userRepository) {
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public Wallet getWallet(Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        return walletRepository.findByUser(user).orElseThrow();
    }
}
