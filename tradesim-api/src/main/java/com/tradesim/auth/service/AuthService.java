package com.tradesim.auth.service;

import com.tradesim.auth.dto.LoginRequest;
import com.tradesim.auth.dto.RegisterRequest;
import com.tradesim.auth.dto.AuthResponse;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
