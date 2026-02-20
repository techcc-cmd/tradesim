package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.trading.dto.PriceAlertRequest;
import com.tradesim.trading.entity.PriceAlert;
import com.tradesim.trading.service.PriceAlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
@RequiredArgsConstructor
public class PriceAlertController {

    private final PriceAlertService priceAlertService;

    @PostMapping
    public ResponseEntity<ApiResponse<PriceAlert>> createAlert(@RequestBody PriceAlertRequest request, Authentication auth) {
        PriceAlert alert = priceAlertService.createAlert(request, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Alert created successfully", alert));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PriceAlert>>> getAlerts(Authentication auth) {
        List<PriceAlert> alerts = priceAlertService.getUserAlerts(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Alerts retrieved", alerts));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAlert(@PathVariable Long id) {
        priceAlertService.deleteAlert(id);
        return ResponseEntity.ok(ApiResponse.success("Alert deleted", null));
    }
}
