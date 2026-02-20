package com.tradesim.auth.service;

import com.tradesim.auth.dto.AuthResponse;
import com.tradesim.auth.dto.LoginRequest;
import com.tradesim.auth.dto.RegisterRequest;
import com.tradesim.auth.security.JwtUtil;
import com.tradesim.entity.Role;
import com.tradesim.entity.User;
import com.tradesim.exception.DuplicateResourceException;
import com.tradesim.exception.InvalidCredentialsException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.repository.PortfolioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final PortfolioRepository portfolioRepository;

    @Override
    @Transactional
    public String register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username already taken");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already used");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER.name());

        User savedUser = userRepository.save(user);

        Portfolio portfolio = Portfolio.builder()
                .user(savedUser)
                .totalValue(new BigDecimal("1000000.00"))
                .cashBalance(new BigDecimal("1000000.00"))
                .investedAmount(BigDecimal.ZERO)
                .totalPnl(BigDecimal.ZERO)
                .dailyPnl(BigDecimal.ZERO)
                .roiPercentage(BigDecimal.ZERO)
                .build();

        portfolioRepository.save(portfolio);

        return "User registered successfully";
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token);
    }
}
