package com.example.tarot.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prediction_history")
public class PredictionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 4000)
    private String inputText;

    private String predictedCard;

    private LocalDateTime createdAt;

    public PredictionRecord() {}

    public PredictionRecord(String inputText, String predictedCard, LocalDateTime createdAt) {
        this.inputText = inputText;
        this.predictedCard = predictedCard;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getInputText() {
        return inputText;
    }

    public void setInputText(String inputText) {
        this.inputText = inputText;
    }

    public String getPredictedCard() {
        return predictedCard;
    }

    public void setPredictedCard(String predictedCard) {
        this.predictedCard = predictedCard;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

