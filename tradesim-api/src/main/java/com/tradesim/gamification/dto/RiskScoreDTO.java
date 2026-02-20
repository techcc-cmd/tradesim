package com.tradesim.gamification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RiskScoreDTO {
    private Integer riskScore;
    private String riskLevel;
    private Integer diversificationScore;
    private Integer positionCount;
    private String recommendation;
}
