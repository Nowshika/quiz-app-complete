package com.example.quiz_app.controller;

import com.example.quiz_app.dto.SubmitRequest;
import com.example.quiz_app.model.Question;
import com.example.quiz_app.model.QuizResult;
import com.example.quiz_app.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        return quizService.getAllQuestions();
    }

    @PostMapping("/questions")
    public Question addQuestion(@RequestBody Question question) {
        return quizService.addQuestion(question);
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResult> submitQuiz(@RequestBody SubmitRequest request) {
        QuizResult result = quizService.submitQuiz(request);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/results")
    public List<QuizResult> getResults() {
        return quizService.getAllResults();
    }
    @DeleteMapping("/questions")
    public ResponseEntity<String> deleteAllQuestions() {
        quizService.deleteAllQuestions();
        return ResponseEntity.ok("All questions deleted!");
    }
}