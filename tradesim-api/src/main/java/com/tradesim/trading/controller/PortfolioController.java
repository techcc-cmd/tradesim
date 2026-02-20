package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.trading.dto.PerformanceMetricsDTO;
import com.tradesim.trading.dto.PortfolioHeatmapDTO;
import com.tradesim.trading.entity.Portfolio;
import com.tradesim.trading.entity.Position;
import com.tradesim.trading.service.HeatmapService;
import com.tradesim.trading.service.PerformanceService;
import com.tradesim.trading.service.PdfExportService;
import com.tradesim.trading.service.PortfolioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final PerformanceService performanceService;
    private final PdfExportService pdfExportService;
    private final HeatmapService heatmapService;

    @GetMapping
    public ResponseEntity<ApiResponse<Portfolio>> getPortfolio(Authentication auth) {
        try {
            Portfolio portfolio = portfolioService.getUserPortfolio(auth.getName());
            return ResponseEntity.ok(ApiResponse.success("Portfolio retrieved", portfolio));
        } catch (ResourceNotFoundException e) {
            Portfolio portfolio = portfolioService.createPortfolio(auth.getName());
            return ResponseEntity.ok(ApiResponse.success("Portfolio created", portfolio));
        }
    }

    @GetMapping("/positions")
    public ResponseEntity<ApiResponse<List<Position>>> getPositions(Authentication auth) {
        List<Position> positions = portfolioService.getUserPositions(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Positions retrieved", positions));
    }

    @PostMapping("/add-funds")
    public ResponseEntity<ApiResponse<Portfolio>> addFunds(@RequestParam BigDecimal amount, Authentication auth) {
        Portfolio portfolio = portfolioService.addFunds(auth.getName(), amount);
        return ResponseEntity.ok(ApiResponse.success("Funds added successfully", portfolio));
    }

    @GetMapping("/performance")
    public ResponseEntity<ApiResponse<PerformanceMetricsDTO>> getPerformance(Authentication auth) {
        PerformanceMetricsDTO metrics = performanceService.getPerformanceMetrics(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Performance metrics retrieved", metrics));
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportReport(Authentication auth) {
        byte[] pdfData = pdfExportService.generatePortfolioReport(auth.getName());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=portfolio-report.txt")
                .contentType(MediaType.TEXT_PLAIN)
                .body(pdfData);
    }

    @GetMapping("/heatmap")
    public ResponseEntity<ApiResponse<PortfolioHeatmapDTO>> getHeatmap(Authentication auth) {
        PortfolioHeatmapDTO heatmap = heatmapService.getPortfolioHeatmap(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Heatmap retrieved", heatmap));
    }
}
