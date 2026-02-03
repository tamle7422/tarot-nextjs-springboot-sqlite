package com.example.tarot.repository;

import com.example.tarot.entity.PredictionRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRecordRepository extends JpaRepository<PredictionRecord, Long> {
}
