package com.example.quiz_app.service;

import com.example.quiz_app.Repositories.QuestionRepository;
import com.example.quiz_app.Repositories.QuizResultRepository;
import com.example.quiz_app.dto.SubmitRequest;
import com.example.quiz_app.model.Question;
import com.example.quiz_app.model.QuizResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private QuizResultRepository resultRepo;

    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }

    public Question addQuestion(Question q) {
        return questionRepo.save(q);
    }

    public QuizResult submitQuiz(SubmitRequest request) {
        List<Question> questions = questionRepo.findAll();
        Map<Long, String> answers = request.getAnswers();

        int score = 0;
        for (Question q : questions) {
            String chosen = answers.get(q.getId());
            if (chosen != null && chosen.equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }


        QuizResult result = new QuizResult();
        result.setStudentName(request.getStudentName());
        result.setScore(score);
        result.setTotalQuestions(questions.size());
        return resultRepo.save(result);
    }

    public List<QuizResult> getAllResults() {
        return resultRepo.findAll();
    }
    public void deleteAllQuestions() {
        questionRepo.deleteAll();
    }

}