package com.tradesim.trading.repository;

import com.tradesim.trading.entity.TournamentParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TournamentParticipantRepository extends JpaRepository<TournamentParticipant, Long> {
    List<TournamentParticipant> findByTournamentIdOrderByTotalPnlDesc(Long tournamentId);
    Optional<TournamentParticipant> findByTournamentIdAndUserId(Long tournamentId, Long userId);
}
