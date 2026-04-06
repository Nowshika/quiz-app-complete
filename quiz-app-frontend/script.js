const API = 'http://localhost:8080/api/quiz';

let questions = [];
let currentIndex = 0;
let answers = {};
let studentName = '';

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  // Scroll to top on screen change
  window.scrollTo(0, 0);
}

async function startQuiz() {
  studentName = document.getElementById('student-name').value.trim();
  if (!studentName) { 
    alert('Please enter your name to begin!'); 
    return; 
  }

  try {
    const res = await fetch(`${API}/questions`);
    questions = await res.json();
    
    if (questions.length === 0) { 
      alert('The question bank is currently empty.'); 
      return; 
    }

    currentIndex = 0;
    answers = {};
    showScreen('quiz-screen');
    renderQuestion();
  } catch (e) {
    alert('Unable to connect to the server. Please ensure the backend is running.');
  }
}

function renderQuestion() {
  const q = questions[currentIndex];
  
  // Update Header & Progress
  document.getElementById('question-counter').textContent = 
    `Question ${currentIndex + 1} of ${questions.length}`;
  document.getElementById('quiz-category').textContent = q.category || 'General';
  
  const progress = ((currentIndex + 1) / questions.length) * 100;
  document.getElementById('progress-fill').style.width = `${progress}%`;

  // Update Text
  document.getElementById('question-text').textContent = q.questionText;

  const opts = [
    { key: 'A', text: q.optionA },
    { key: 'B', text: q.optionB },
    { key: 'C', text: q.optionC },
    { key: 'D', text: q.optionD }
  ];

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  opts.forEach(opt => {
    const btn = document.createElement('button');
    const isSelected = answers[q.id] === opt.key;
    
    btn.className = 'option-btn' + (isSelected ? ' selected' : '');
    btn.innerHTML = `
      <span class="option-label">${opt.key}</span>
      <span>${opt.text}</span>
    `;
    btn.onclick = () => selectAnswer(q.id, opt.key);
    container.appendChild(btn);
  });

  // Toggle button text
  const nextBtn = document.getElementById('next-btn');
  nextBtn.textContent = currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next';
}

function selectAnswer(questionId, key) {
  answers[questionId] = key;
  renderQuestion();
}

function nextQuestion() {
  // Optional: Check if answer selected before proceeding
  if (!answers[questions[currentIndex].id]) {
    alert('Please select an answer before moving forward.');
    return;
  }

  if (currentIndex === questions.length - 1) {
    submitQuiz();
  } else {
    currentIndex++;
    renderQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) { 
    currentIndex--; 
    renderQuestion(); 
  } else {
    showScreen('landing-screen');
  }
}

async function submitQuiz() {
  try {
    const payload = { studentName, answers };
    const res = await fetch(`${API}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const result = await res.json();
    showResult(result);
  } catch (e) {
    alert('Failed to submit results. Check your connection.');
  }
}

function showResult(result) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  document.getElementById('score-circle').textContent = `${percentage}%`;
  document.getElementById('result-name').textContent = `Excellent, ${result.studentName}!`;
  
  const msgEl = document.getElementById('result-message');
  if (percentage >= 80) msgEl.textContent = 'You are an SDG Expert! 🌟';
  else if (percentage >= 50) msgEl.textContent = 'Great progress, keep learning! 📚';
  else msgEl.textContent = 'Keep practicing to master the goals! 💪';

  document.getElementById('stat-correct').textContent = result.score;
  document.getElementById('stat-wrong').textContent = result.totalQuestions - result.score;
  document.getElementById('stat-total').textContent = result.totalQuestions;
  
  showScreen('result-screen');
}

async function viewLeaderboard() {
  try {
    const res = await fetch(`${API}/results`);
    let results = await res.json();
    
    // Sort by highest score, then by latest date
    results.sort((a, b) => b.score - a.score || new Date(b.attemptedAt) - new Date(a.attemptedAt));

    const list = document.getElementById('leaderboard-list');
    list.innerHTML = results.map((r, i) => `
      <div class="lb-row">
        <span class="lb-rank">#${i + 1}</span>
        <div class="lb-info">
          <span class="lb-name">${r.studentName}</span>
          <span class="lb-date">${new Date(r.attemptedAt).toLocaleDateString()}</span>
        </div>
        <span class="lb-score">${r.score}/${r.totalQuestions}</span>
      </div>
    `).join('');
    
    showScreen('leaderboard-screen');
  } catch (e) {
    alert('Could not load leaderboard data.');
  }
}

function restartQuiz() {
  showScreen('landing-screen');
}