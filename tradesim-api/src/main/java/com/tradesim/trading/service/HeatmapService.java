package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.dto.PortfolioHeatmapDTO;
import com.tradesim.trading.entity.Position;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeatmapService {

    private final UserRepository userRepository;
    private final PositionRepository positionRepository;

    public PortfolioHeatmapDTO getPortfolioHeatmap(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Position> positions = positionRepository.findByUserId(user.getId());

        BigDecimal totalValue = positions.stream()
                .map(p -> p.getCurrentPrice().multiply(BigDecimal.valueOf(p.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<PortfolioHeatmapDTO.HeatmapItem> items = positions.stream()
                .map(position -> {
                    BigDecimal value = position.getCurrentPrice().multiply(BigDecimal.valueOf(position.getQuantity()));
                    BigDecimal percentage = totalValue.compareTo(BigDecimal.ZERO) > 0
                            ? value.divide(totalValue, 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                            : BigDecimal.ZERO;
                    BigDecimal pnl = value.subtract(position.getAveragePrice().multiply(BigDecimal.valueOf(position.getQuantity())));
                    BigDecimal pnlPercentage = position.getAveragePrice().compareTo(BigDecimal.ZERO) > 0
                            ? pnl.divide(position.getAveragePrice().multiply(BigDecimal.valueOf(position.getQuantity())), 4, RoundingMode.HALF_UP).multiply(BigDecimal.valueOf(100))
                            : BigDecimal.ZERO;

                    String color = pnlPercentage.compareTo(BigDecimal.ZERO) > 0 ? "green" : "red";

                    return PortfolioHeatmapDTO.HeatmapItem.builder()
                            .symbol(position.getSymbol())
                            .name(position.getSymbol())
                            .value(value)
                            .percentage(percentage)
                            .pnl(pnl)
                            .pnlPercentage(pnlPercentage)
                            .color(color)
                            .build();
                })
                .collect(Collectors.toList());

        return PortfolioHeatmapDTO.builder()
                .items(items)
                .totalValue(totalValue)
                .build();
    }
}
