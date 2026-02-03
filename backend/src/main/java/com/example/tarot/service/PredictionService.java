package com.example.tarot.service;

import com.example.tarot.entity.PredictionRecord;
import com.example.tarot.repository.PredictionRecordRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;

@Service
public class PredictionService {

    private final PredictionRecordRepository repository;

    @Value("${ml.python.command:python}")
    private String pythonCommand;

    @Value("${ml.predict.script:/app/ml/predict.py}")
    private String predictScriptPath;

    public PredictionService(PredictionRecordRepository repository) {
        this.repository = repository;
    }

    public PredictionRecord predictAndSave(String text) throws Exception {
        String card = runPythonPrediction(text);
        PredictionRecord record = new PredictionRecord(text, card, LocalDateTime.now());
        return repository.save(record);
    }

    public java.util.List<PredictionRecord> getHistory() {
        return repository.findAll();
    }

    private String runPythonPrediction(String text) throws Exception {
        ProcessBuilder pb = new ProcessBuilder(
                pythonCommand,
                predictScriptPath,
                text
        );
        pb.redirectErrorStream(true);
        Process process = pb.start();

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()))) {
            String line = reader.readLine();
            int exitCode = process.waitFor();
            if (exitCode != 0 || line == null || line.isBlank()) {
                throw new RuntimeException("Prediction script failed");
            }
            return line.trim();
        }
    }
}