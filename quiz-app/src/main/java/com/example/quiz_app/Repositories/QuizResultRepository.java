package com.example.quiz_app.Repositories;

import com.example.quiz_app.model.QuizResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {}