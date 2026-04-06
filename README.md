# 🎓 QuizIQ — Quality Education Platform

### SRM TRP Engineering College, Trichy

**Department of Computer Science and Engineering** _Web Technologies Assignment | 2023–2027 Batch_

* * *

## 🌟 Overview

**QuizIQ** is a full-stack educational assessment tool designed to promote **SDG 4: Quality Education**. The platform allows students to test their knowledge through an interactive interface, while the backend manages a persistent question bank and a global leaderboard using a RESTful architecture.

* * *

## 🎯 SDG Alignment

| Goal | Title | Contribution |
| --- | --- | --- |
| 04 | Quality Education | Provides an accessible digital platform for self-assessment and learning reinforcement. |
| 08 | Decent Work | Built using industry-standard frameworks (Spring Boot/PostgreSQL) to simulate real-world development environments. |
| 09 | Innovation | Utilizes a decoupled architecture (Separation of Concerns) between UI and Logic layers. |

* * *

## 🛠️ Technical Stack

### Frontend

*   **Language:** HTML5, CSS3, JavaScript (ES6+)
    
*   **Styling:** Custom CSS Grid & Flexbox (No external frameworks for maximum performance)
    
*   **Features:** Asynchronous API fetching, Dynamic DOM manipulation, Responsive Design.
    

### Backend

*   **Framework:** Spring Boot 3.x
    
*   **Language:** Java 17
    
*   **Security:** CORS Configuration for cross-origin resource sharing.
    
*   **Tools:** Maven for dependency management.
    

### Database & Tools

*   **Database:** PostgreSQL (Relational)
    
*   **ORM:** Spring Data JPA / Hibernate
    
*   **API Testing:** Postman
    
*   **IDEs:** IntelliJ IDEA & VS Code
    

* * *

## 🏗️ System Architecture

The application follows a **3-Tier Architecture**, ensuring that the data management, application logic, and user interface are independent.

### Project Directory Structure

Bash

    quiz-app-complete/
    ├── 🟢 quiz-app (Backend)
    │   ├── src/main/java/com/example/quiz_app/
    │   │   ├── controller/      # REST API Endpoints
    │   │   ├── service/         # Business Logic & Scoring
    │   │   ├── model/           # JPA Entities (Database Tables)
    │   │   ├── dto/             # Data Transfer Objects for Requests
    │   │   └── repositories/    # Interface for CRUD operations
    │   └── src/main/resources/  # application.properties (DB Config)
    └── 🔵 quiz-app-frontend (Frontend)
        ├── index.html           # Structure & SEO
        ├── style.css            # Modern UI/UX Styles
        └── script.js            # State management & API Integration

* * *

## 🛣️ API Endpoints (REST)

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /api/quiz/questions | Fetch all questions for the quiz session. |
| POST | /api/quiz/questions | Add a new question to the database via Postman. |
| POST | /api/quiz/submit | Submit user answers and receive calculated score. |
| GET | /api/quiz/results | Retrieve all historical attempts for the leaderboard. |

* * *

## 🗄️ Database Schema

### 1\. Questions Table

Used to store the educational content and the correct key for validation.

*   `id`: Primary Key (BigInt)
    
*   `question_text`: The actual question string.
    
*   `option_a` to `option_d`: Multiple choice options.
    
*   `correct_answer`: The correct key (A, B, C, or D).
    

### 2\. Quiz Results Table

Used to track student progress and display the leaderboard.

*   `student_name`: Name entered at the start.
    
*   `score`: Number of correct answers.
    
*   `attempted_at`: Auto-generated timestamp.
    

* * *

## 🚀 Installation & Setup

### 1\. Prerequisites

*   Install **Java JDK 17** or higher.
    
*   Install **PostgreSQL** and create a database named `quizdb`.
    
*   Install **Node.js** (Optional, for serving) or **VS Code Live Server**.
    

### 2\. Backend Setup

1.  Open the `quiz-app` folder in **IntelliJ IDEA**.
    
2.  Navigate to `src/main/resources/application.properties`.
    
3.  Update the `spring.datasource.password` to match your PostgreSQL password.
    
4.  Run the application. The server will start at `http://localhost:8080`.
    

### 3\. Frontend Setup

1.  Open the `quiz-app-frontend` folder in **VS Code**.
    
2.  Right-click `index.html` and select **"Open with Live Server"**.
    
3.  Access the UI at `http://127.0.0.1:5500`.
    

* * *

## 📸 Interface Preview

> _\[Insert Screenshots of your Landing Page, Quiz Interface, and Leaderboard here\]_

* * *

## 👤 Author Information

*   **Developer:** Nowshika
    
*   **Year/Section:** III CSE-B
    
*   **College:** SRM TRP Engineering College, Trichy
    
*   **Date:** April 2026
    

* * *

_This project was developed as part of the Web Technologies Lab Curriculum._
