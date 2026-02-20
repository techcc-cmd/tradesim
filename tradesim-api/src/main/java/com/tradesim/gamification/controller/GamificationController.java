package com.tradesim.gamification.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.gamification.dto.LeaderboardDTO;
import com.tradesim.gamification.dto.RiskScoreDTO;
import com.tradesim.gamification.entity.Achievement;
import com.tradesim.gamification.service.AchievementService;
import com.tradesim.gamification.service.LeaderboardService;
import com.tradesim.gamification.service.RiskScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gamification")
@RequiredArgsConstructor
public class GamificationController {

    private final AchievementService achievementService;
    private final LeaderboardService leaderboardService;
    private final RiskScoreService riskScoreService;

    @GetMapping("/achievements")
    public ResponseEntity<ApiResponse<List<Achievement>>> getAchievements(Authentication auth) {
        List<Achievement> achievements = achievementService.getUserAchievements(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Achievements retrieved", achievements));
    }

    @PostMapping("/achievements/check")
    public ResponseEntity<ApiResponse<List<Achievement>>> checkAchievements(Authentication auth) {
        List<Achievement> newAchievements = achievementService.checkAndAwardAchievements(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Achievements checked", newAchievements));
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<ApiResponse<List<LeaderboardDTO>>> getLeaderboard() {
        List<LeaderboardDTO> leaderboard = leaderboardService.getLeaderboard();
        return ResponseEntity.ok(ApiResponse.success("Leaderboard retrieved", leaderboard));
    }

    @GetMapping("/risk-score")
    public ResponseEntity<ApiResponse<RiskScoreDTO>> getRiskScore(Authentication auth) {
        RiskScoreDTO riskScore = riskScoreService.calculateRiskScore(auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Risk score calculated", riskScore));
    }
}
