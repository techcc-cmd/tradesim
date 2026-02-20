package com.tradesim.trading.repository;

import com.tradesim.trading.entity.Wallet;
import com.tradesim.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUser(User user);
}
