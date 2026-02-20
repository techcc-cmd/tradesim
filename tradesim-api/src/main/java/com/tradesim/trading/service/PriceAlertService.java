package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.dto.PriceAlertRequest;
import com.tradesim.trading.entity.PriceAlert;
import com.tradesim.trading.repository.PriceAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PriceAlertService {

    private final PriceAlertRepository priceAlertRepository;
    private final UserRepository userRepository;

    @Transactional
    public PriceAlert createAlert(PriceAlertRequest request, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        PriceAlert alert = PriceAlert.builder()
                .user(user)
                .symbol(request.getSymbol())
                .targetPrice(request.getTargetPrice())
                .conditionType(request.getConditionType())
                .active(true)
                .build();

        return priceAlertRepository.save(alert);
    }

    public List<PriceAlert> getUserAlerts(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return priceAlertRepository.findByUserIdAndActiveTrue(user.getId());
    }

    @Transactional
    public void deleteAlert(Long alertId) {
        priceAlertRepository.deleteById(alertId);
    }
}
