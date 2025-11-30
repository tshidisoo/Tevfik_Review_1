// Track answered questions for progress
let answeredQuestions = new Set();
const totalQuestions = calculateTotalQuestions();

// Exercise 6 correct answers
const exercise6Answers = {
  alex: { bike: '✓', football: '✓', horse: '✗', kite: '✗', tennis: '✗' },
  ruby: { bike: '✗', football: '✗', horse: '✗', kite: '✓', tennis: '✓' }
};

// Exercise 4 correct order
const correctOrder = [2, 5, 3, 6, 1, 4];

function calculateTotalQuestions() {
  const ex1 = 5; // odd-one-out
  const ex2 = 5; // matching
  const ex3 = 5; // sounds
  const ex4 = 6; // dialogue order
  const ex5 = 5; // fill in verbs
  const ex6 = 10; // table (5 activities × 2 people)
  const ex7 = 8; // a/an
  return ex1 + ex2 + ex3 + ex4 + ex5 + ex6 + ex7;
}

function updateProgress() {
  const progress = (answeredQuestions.size / totalQuestions) * 100;
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = progress + '%';
  progressBar.textContent = Math.round(progress) + '%';
}

// Track input changes
document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
  input.addEventListener('input', function() {
    if (this.value.trim()) {
      answeredQuestions.add(this);
    } else {
      answeredQuestions.delete(this);
    }
    updateProgress();
  });
});

// Track checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    answeredQuestions.add(this);
    updateProgress();
  });
});

// Exercise 6 - Click to toggle ✓ and ✗
document.querySelectorAll('.can-table .clickable').forEach(cell => {
  cell.addEventListener('click', function() {
    if (this.textContent.trim() === '') {
      this.textContent = '✓';
    } else if (this.textContent === '✓') {
      this.textContent = '✗';
    } else {
      this.textContent = '';
    }
    answeredQuestions.add(this);
    updateProgress();
  });
});

// Main submit button
document.getElementById('submitTest').addEventListener('click', function() {
  let totalCorrect = 0;
  const exerciseScores = {};
  
  // Exercise 1 - Odd one out
  let ex1Correct = 0;
  document.querySelectorAll('.answer-input').forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      ex1Correct++;
      totalCorrect++;
      input.classList.add('correct-feedback');
      input.classList.remove('incorrect-feedback');
    } else {
      input.classList.add('incorrect-feedback');
      input.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 1: Odd-one-out'] = `${ex1Correct}/5`;

  // Exercise 2 - Matching
  let ex2Correct = 0;
  document.querySelectorAll('.short-answer').forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      ex2Correct++;
      totalCorrect++;
      input.classList.add('correct-feedback');
      input.classList.remove('incorrect-feedback');
    } else {
      input.classList.add('incorrect-feedback');
      input.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 2: Matching'] = `${ex2Correct}/5`;

  // Exercise 3 - Sound identification
  let ex3Correct = 0;
  document.querySelectorAll('.sound-group').forEach(group => {
    const correctIndex = parseInt(group.dataset.correct);
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    let isCorrect = false;
    
    checkboxes.forEach((cb, i) => {
      const label = cb.parentElement;
      if (i === correctIndex && cb.checked) {
        isCorrect = true;
        label.classList.add('correct-feedback');
        label.classList.remove('incorrect-feedback');
      } else if (cb.checked) {
        label.classList.add('incorrect-feedback');
        label.classList.remove('correct-feedback');
      } else {
        label.classList.remove('correct-feedback', 'incorrect-feedback');
      }
    });
    
    if (isCorrect) {
      ex3Correct++;
      totalCorrect++;
    }
  });
  exerciseScores['Exercise 3: Sounds'] = `${ex3Correct}/5`;

  // Exercise 4 - Dialogue order
  let ex4Correct = 0;
  const numInputs = document.querySelectorAll('.num-input');
  numInputs.forEach((input, index) => {
    const userAnswer = parseInt(input.value);
    if (userAnswer === correctOrder[index]) {
      ex4Correct++;
      totalCorrect++;
      input.classList.add('correct-feedback');
      input.classList.remove('incorrect-feedback');
    } else {
      input.classList.add('incorrect-feedback');
      input.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 4: Dialogue Order'] = `${ex4Correct}/6`;

  // Exercise 5 - Fill in verbs
  let ex5Correct = 0;
  document.querySelectorAll('.fill-input').forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      ex5Correct++;
      totalCorrect++;
      input.classList.add('correct-feedback');
      input.classList.remove('incorrect-feedback');
    } else {
      input.classList.add('incorrect-feedback');
      input.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 5: Verbs'] = `${ex5Correct}/5`;

  // Exercise 6 - Table
  let ex6Correct = 0;
  document.querySelectorAll('.can-table .clickable').forEach(cell => {
    const person = cell.dataset.person;
    const activity = cell.dataset.activity;
    const userAnswer = cell.textContent.trim();
    const correctAnswer = exercise6Answers[person][activity];
    
    if (userAnswer === correctAnswer) {
      ex6Correct++;
      totalCorrect++;
      cell.classList.add('correct-feedback');
      cell.classList.remove('incorrect-feedback');
    } else {
      cell.classList.add('incorrect-feedback');
      cell.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 6: Can/Can\'t Table'] = `${ex6Correct}/10`;

  // Exercise 7 - a/an
  let ex7Correct = 0;
  document.querySelectorAll('.a-an-input').forEach(input => {
    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = input.dataset.answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      ex7Correct++;
      totalCorrect++;
      input.classList.add('correct-feedback');
      input.classList.remove('incorrect-feedback');
    } else {
      input.classList.add('incorrect-feedback');
      input.classList.remove('correct-feedback');
    }
  });
  exerciseScores['Exercise 7: A/An'] = `${ex7Correct}/8`;

  // Calculate percentage
  const percentage = ((totalCorrect / totalQuestions) * 100).toFixed(1);
  
  // Determine performance message
  let performanceMessage = '';
  let performanceClass = '';
  let emoji = '';
  
  if (percentage >= 90) {
    performanceMessage = 'Outstanding! Excellent work!';
    performanceClass = 'excellent';
    emoji = '🌟🎉🏆';
  } else if (percentage >= 80) {
    performanceMessage = 'Great job! Well done!';
    performanceClass = 'excellent';
    emoji = '😊👍✨';
  } else if (percentage >= 70) {
    performanceMessage = 'Good effort! Keep practicing!';
    performanceClass = 'good';
    emoji = '👏📚💪';
  } else if (percentage >= 60) {
    performanceMessage = 'Fair work! You can do better!';
    performanceClass = 'good';
    emoji = '🙂📖';
  } else {
    performanceMessage = 'Keep trying! Practice makes perfect!';
    performanceClass = 'needs-improvement';
    emoji = '💪📚🌱';
  }

  // Display results
  const resultContainer = document.getElementById('result');
  resultContainer.innerHTML = `
    <div class="score-display">${emoji}</div>
    <h2 style="color: #2c3e50; margin: 20px 0;">Your Test Results</h2>
    <div class="score-fraction">Score: ${totalCorrect} / ${totalQuestions}</div>
    <div class="score-percentage">Percentage: ${percentage}%</div>
    <div class="performance-message ${performanceClass}">${performanceMessage}</div>
    
    <div class="breakdown">
      <h3>📊 Exercise Breakdown</h3>
      ${Object.entries(exerciseScores).map(([exercise, score]) => `
        <div class="breakdown-item">
          <span>${exercise}</span>
          <span class="breakdown-score">${score}</span>
        </div>
      `).join('')}
    </div>
  `;
  
  resultContainer.classList.add('show');
  
  // Smooth scroll to results
  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  
  // Update progress bar to 100%
  const progressBar = document.getElementById('progressBar');
  progressBar.style.width = '100%';
  progressBar.textContent = 'Completed!';
});

// Clear feedback when user makes changes after submission
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', function() {
    this.classList.remove('correct-feedback', 'incorrect-feedback');
  });
});

document.querySelectorAll('.can-table .clickable').forEach(cell => {
  cell.addEventListener('click', function() {
    this.classList.remove('correct-feedback', 'incorrect-feedback');
  });
});

// Initialize
console.log('English Review Test loaded successfully!');
console.log(`Total questions: ${totalQuestions}`);