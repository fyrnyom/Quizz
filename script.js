const questions = [
    { q: "Gunung tertinggi di Indonesia adalah?", options: ["Merapi", "Puncak Jaya", "Rinjani", "Semeru"], correct: 1 },
    { q: "Hewan mamalia terbesar di dunia?", options: ["Gajah", "Paus Biru", "Hiu Megalodon", "Jerapah"], correct: 1 },
    { q: "Danau terbesar di Indonesia adalah?", options: ["Danau Toba", "Danau Singkarak", "Danau Poso", "Danau Sentani"], correct: 0 },
    { q: "Negara mana yang dijuluki Negeri Tirai Bambu?", options: ["Jepang", "Korea", "China", "Thailand"], correct: 2 },
    { q: "Warna pelangi setelah kuning adalah?", options: ["Merah", "Ungu", "Biru", "Hijau"], correct: 3 },
    { q: "Benua terkecil di dunia adalah?", options: ["Eropa", "Australia", "Antartika", "Asia"], correct: 1 },
    { q: "Burung yang menjadi simbol negara Indonesia?", options: ["Elang", "Cendrawasih", "Garuda", "Beo"], correct: 2 },
    { q: "Planet terdekat dari matahari?", options: ["Venus", "Bumi", "Mars", "Merkurius"], correct: 3 },
    { q: "Hutan hujan tropis terbesar ada di negara?", options: ["Brasil", "Indonesia", "Kongo", "Malaysia"], correct: 0 },
    { q: "Mata uang resmi negara Inggris adalah?", options: ["Euro", "Dollar", "Poundsterling", "Yen"], correct: 2 }
];

let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 15; 

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const timerLine = document.getElementById('timer-line');

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    clearInterval(timer); 
    timeLeft = 15; 
    updateTimerBar();

    const data = questions[currentIndex];
    questionEl.innerText = data.q;
    document.getElementById('progress').innerText = `Soal ${currentIndex + 1} dari ${questions.length}`;
    optionsEl.innerHTML = '';
    nextBtn.classList.add('hide');

    data.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(i, btn);
        optionsEl.appendChild(btn);
    });

   
    timer = setInterval(() => {
        timeLeft--;
        updateTimerBar();
        if (timeLeft <= 0) {
            handleTimeOut();
        }
    }, 1000);
}

function updateTimerBar() {
    const percentage = (timeLeft / 15) * 100;
    timerLine.style.width = percentage + "%";
}

function checkAnswer(index, btn) {
    clearInterval(timer); 
    const correct = questions[currentIndex].correct;
    const allBtns = document.querySelectorAll('.option-btn');

    if (index === correct) {
        btn.classList.add('correct');
        score++;
        document.getElementById('current-score').innerText = score;
    } else {
        btn.classList.add('wrong');
        allBtns[correct].classList.add('correct');
    }

    disableButtons();
}

function handleTimeOut() {
    clearInterval(timer);
    const correct = questions[currentIndex].correct;
    const allBtns = document.querySelectorAll('.option-btn');
    

    allBtns[correct].classList.add('correct');
    disableButtons();
    
    
    questionEl.innerText = "Waktu Habis! ⌛";
}

function disableButtons() {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);
    nextBtn.classList.remove('hide');
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById('quiz-app').classList.add('hide');
    document.getElementById('result-screen').classList.remove('hide');
    document.getElementById('final-score').innerText = `Skor akhir: ${score}/${questions.length}`;
}

startQuiz();