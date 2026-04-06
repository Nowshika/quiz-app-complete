package com.example.quiz_app.dto;

import java.util.Map;

public class SubmitRequest {

    private String studentName;
    private Map<Long, String> answers;

    public String getStudentName() { return studentName; }
    public void setStudentName(String name) { this.studentName = name; }
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}