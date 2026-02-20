package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.dto.PerformanceMetricsDTO;
import com.tradesim.trading.entity.Order;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.entity.Position;
import com.tradesim.trading.repository.OrderRepository;
import com.tradesim.trading.repository.PortfolioRepository;
import com.tradesim.trading.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PdfExportService {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PositionRepository positionRepository;
    private final OrderRepository orderRepository;
    private final PerformanceService performanceService;

    public byte[] generatePortfolioReport(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Portfolio portfolio = portfolioRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio not found"));

        List<Position> positions = positionRepository.findByUserId(user.getId());
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        PerformanceMetricsDTO metrics = performanceService.getPerformanceMetrics(username);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        try {
            StringBuilder report = new StringBuilder();
            report.append("TRADESIM PRO - PORTFOLIO REPORT\n");
            report.append("Generated: ").append(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"))).append("\n");
            report.append("User: ").append(username).append("\n\n");
            
            report.append("PORTFOLIO SUMMARY\n");
            report.append("Total Value: ₹").append(portfolio.getTotalValue()).append("\n");
            report.append("Cash Balance: ₹").append(portfolio.getCashBalance()).append("\n");
            report.append("Invested: ₹").append(portfolio.getInvestedAmount()).append("\n");
            report.append("Total P&L: ₹").append(portfolio.getTotalPnl()).append("\n\n");
            
            report.append("PERFORMANCE METRICS\n");
            report.append("Win Rate: ").append(metrics.getWinRate()).append("%\n");
            report.append("Total Trades: ").append(metrics.getTotalTrades()).append("\n");
            report.append("Winning Trades: ").append(metrics.getWinningTrades()).append("\n");
            report.append("Losing Trades: ").append(metrics.getLosingTrades()).append("\n");
            report.append("Avg Profit/Trade: ₹").append(metrics.getAvgProfitPerTrade()).append("\n");
            report.append("Best Trade: ₹").append(metrics.getBestTrade()).append("\n");
            report.append("Worst Trade: ₹").append(metrics.getWorstTrade()).append("\n\n");
            
            report.append("CURRENT POSITIONS\n");
            for (Position pos : positions) {
                report.append(pos.getSymbol()).append(" - Qty: ").append(pos.getQuantity())
                      .append(", Avg: ₹").append(pos.getAveragePrice())
                      .append(", LTP: ₹").append(pos.getCurrentPrice())
                      .append(", P&L: ₹").append(pos.getPnl()).append("\n");
            }
            
            baos.write(report.toString().getBytes());
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF", e);
        }
        
        return baos.toByteArray();
    }
}
