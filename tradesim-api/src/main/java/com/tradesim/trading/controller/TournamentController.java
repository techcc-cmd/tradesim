package com.tradesim.trading.controller;

import com.tradesim.common.ApiResponse;
import com.tradesim.trading.entity.Tournament;
import com.tradesim.trading.entity.TournamentParticipant;
import com.tradesim.trading.service.TournamentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournaments")
@RequiredArgsConstructor
public class TournamentController {

    private final TournamentService tournamentService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Tournament>>> getActiveTournaments() {
        List<Tournament> tournaments = tournamentService.getActiveTournaments();
        return ResponseEntity.ok(ApiResponse.success("Tournaments retrieved", tournaments));
    }

    @GetMapping("/{id}/leaderboard")
    public ResponseEntity<ApiResponse<List<TournamentParticipant>>> getLeaderboard(@PathVariable Long id) {
        List<TournamentParticipant> leaderboard = tournamentService.getTournamentLeaderboard(id);
        return ResponseEntity.ok(ApiResponse.success("Leaderboard retrieved", leaderboard));
    }

    @PostMapping("/{id}/join")
    public ResponseEntity<ApiResponse<TournamentParticipant>> joinTournament(@PathVariable Long id, Authentication auth) {
        TournamentParticipant participant = tournamentService.joinTournament(id, auth.getName());
        return ResponseEntity.ok(ApiResponse.success("Joined tournament successfully", participant));
    }
}
