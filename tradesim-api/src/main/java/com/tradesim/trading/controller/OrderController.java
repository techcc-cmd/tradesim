package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.trading.dto.OrderRequest;
import com.tradesim.trading.entity.Order;
import com.tradesim.trading.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> placeOrder(@RequestBody OrderRequest request, Authentication auth) {
        Order order = orderService.placeOrder(request, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", order));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Order>>> getOrders(Authentication auth) {
        List<Order> orders = orderService.getUserOrders(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Orders retrieved", orders));
    }
}
