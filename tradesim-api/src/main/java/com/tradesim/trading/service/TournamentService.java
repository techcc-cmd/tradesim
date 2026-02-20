package com.tradesim.trading.service;

import com.tradesim.entity.User;
import com.tradesim.exception.ResourceNotFoundException;
import com.tradesim.repository.UserRepository;
import com.tradesim.trading.entity.Tournament;
import com.tradesim.trading.entity.TournamentParticipant;
import com.tradesim.trading.repository.TournamentParticipantRepository;
import com.tradesim.trading.repository.TournamentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final TournamentRepository tournamentRepository;
    private final TournamentParticipantRepository participantRepository;
    private final UserRepository userRepository;

    public List<Tournament> getActiveTournaments() {
        return tournamentRepository.findByStatusOrderByStartDateDesc("ACTIVE");
    }

    public List<TournamentParticipant> getTournamentLeaderboard(Long tournamentId) {
        return participantRepository.findByTournamentIdOrderByTotalPnlDesc(tournamentId);
    }

    @Transactional
    public TournamentParticipant joinTournament(Long tournamentId, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Tournament tournament = tournamentRepository.findById(tournamentId)
                .orElseThrow(() -> new ResourceNotFoundException("Tournament not found"));

        TournamentParticipant participant = TournamentParticipant.builder()
                .tournament(tournament)
                .user(user)
                .startingBalance(new BigDecimal("1000000.00"))
                .currentBalance(new BigDecimal("1000000.00"))
                .totalPnl(BigDecimal.ZERO)
                .rank(0)
                .build();

        return participantRepository.save(participant);
    }
}
