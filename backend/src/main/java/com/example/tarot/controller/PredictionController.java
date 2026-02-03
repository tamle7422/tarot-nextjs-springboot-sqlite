package com.example.tarot.controller;

import com.example.tarot.entity.PredictionRecord;
import com.example.tarot.service.PredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<?> predict(@RequestBody Map<String, String> body) {
        try {
            String text = body.getOrDefault("text", "");
            PredictionRecord record = predictionService.predictAndSave(text);
            return ResponseEntity.ok(Map.of(
                    "id", record.getId(),
                    "text", record.getInputText(),
                    "predictedCard", record.getPredictedCard(),
                    "createdAt", record.getCreatedAt().toString()
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<PredictionRecord>> history() {
        return ResponseEntity.ok(predictionService.getHistory());
    }
}