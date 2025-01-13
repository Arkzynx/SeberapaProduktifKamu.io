const questions = [
    "Saya sering merasa produktif di pagi hari.",
    "Saya mampu menyelesaikan tugas tepat waktu.",
    "Saya cenderung menunda-nunda pekerjaan.",
    "Saya memiliki tujuan yang jelas setiap hari.",
    "Saya merasa termotivasi untuk bekerja.",
    "Saya sering merencanakan hari saya di malam sebelumnya.",
    "Saya merasa mudah untuk fokus pada tugas.",
    "Saya sering merasa kelelahan saat bekerja.",
    "Saya menikmati tantangan yang sulit di pekerjaan.",
    "Saya memiliki rutinitas harian yang konsisten.",
    "Saya menghindari gangguan saat bekerja.",
    "Saya merasa cemas ketika ada pekerjaan yang tertunda.",
    "Saya mencari cara untuk meningkatkan produktivitas.",
    "Saya merasa puas dengan pencapaian saya.",
    "Saya merasa terbebani dengan banyaknya tugas yang harus dikerjakan.",
    "Saya sering merasa kurang tidur karena pekerjaan.",
    "Saya merasa lebih produktif saat bekerja di tim.",
    "Saya menyukai pekerjaan yang menuntut kreativitas.",
    "Saya merasa cemas ketika tidak ada pekerjaan yang harus dilakukan.",
    "Saya merasa memiliki kontrol penuh terhadap waktu saya."
];

let answers = [];
let currentQuestion = 0;

const nicknames = [
    { range: [0, 10], nickname: "The Trailblazer", description: "Kamu Anda adalah seorang inovator yang selalu mencari cara baru untuk mencapai tujuanmu. Anda memiliki visi yang jelas dan kemampuan untuk membawa ide-ide besar ke dalam dunia nyata." },
    { range: [11, 20], nickname: "The Innovator", description: "Anda adalah seorang pemimpin yang memotivasi orang lain untuk bergerak maju. Anda tidak takut mengambil langkah pertama dan memberi dampak besar." },
    { range: [21, 30], nickname: "The Visionary", description: "Sebagai pemimpi, Anda melihat potensi besar dalam diri orang lain dan berani mengejar impian Anda sendiri. Anda memiliki tekad dan keberanian untuk mewujudkan ide-ide kreatif." },
    { range: [31, 40], nickname: "The Maverick", description: "Dengan semangat yang kuat, Anda selalu siap menghadapi tantangan. Anda adalah seorang pendobrak yang selalu mencari cara untuk membuat perubahan dan menciptakan dampak." },
    { range: [41, 50], nickname: "The Catalyst", description: "Anda memiliki kemampuan luar biasa untuk memicu perubahan dalam diri orang lain. Anda adalah katalisator yang membawa energi positif dan semangat baru." },
    { range: [51, 60], nickname: "The Sentinel", description: "Sebagai penjaga, Anda sangat berkomitmen pada tugas Anda dan memastikan bahwa setiap hal dilakukan dengan tepat. Anda adalah seseorang yang dapat diandalkan oleh tim Anda." },
    { range: [61, 70], nickname: "The Titan", description: "Anda memiliki kekuatan untuk menghadapi tantangan besar dengan keberanian. Seperti seorang raksasa, Anda mampu mengatasi masalah besar dan meraih kesuksesan." },
    { range: [71, 80], nickname: "The Virtuoso", description: "Anda adalah seorang ahli dalam bidang Anda. Dengan keterampilan dan dedikasi yang tinggi, Anda selalu memberikan hasil terbaik dan menginspirasi orang lain." },
    { range: [81, 90], nickname: "The Conqueror", description: "Sebagai penakluk, Anda memiliki tekad yang tak tergoyahkan untuk mencapai tujuan Anda. Anda tahu bagaimana mengatasi rintangan dan terus maju menuju kemenangan." },
    { range: [91, 100], nickname: "The Phantom", description: "Seperti hantu, Anda memiliki kemampuan untuk tetap tenang dan fokus dalam situasi yang penuh tekanan. Anda mampu membuat keputusan bijak dengan ketenangan pikiran." }
];

function startQuiz() {
    const name = document.getElementById("name").value;
    if (!name) {
        alert("Mohon masukkan nama terlebih dahulu.");
        return;
    }
    document.getElementById("startPage").style.display = "none";
    document.getElementById("quizPage").style.display = "block";
    loadQuestion();
}

function loadQuestion() {
    const questionContainer = document.getElementById("questionContainer");
    const question = questions[currentQuestion];
    questionContainer.innerHTML = `
        <p class="question">${currentQuestion + 1}. ${question}</p>
        <div class="options">
            <input type="radio" id="q${currentQuestion}-0" name="q${currentQuestion}" value="0">
            <label for="q${currentQuestion}-0">Tidak Setuju</label>
            <input type="radio" id="q${currentQuestion}-1" name="q${currentQuestion}" value="1">
            <label for="q${currentQuestion}-1">Setuju</label>
            <input type="radio" id="q${currentQuestion}-2" name="q${currentQuestion}" value="2">
            <label for="q${currentQuestion}-2">Sangat Setuju</label>
        </div>
    `;
    document.getElementById("questionTitle").textContent = `Jawab Pertanyaan ${currentQuestion + 1}`;
}

function nextQuestion() {
    const radios = document.querySelectorAll(`input[name="q${currentQuestion}"]`);
    let selectedAnswer = null;
    for (let radio of radios) {
        if (radio.checked) {
            selectedAnswer = radio.value;
            break;
        }
    }
    
    if (selectedAnswer !== null) {
        answers.push(parseInt(selectedAnswer));
        currentQuestion++;

        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            calculateResult();
        }
    } else {
        alert("Mohon pilih jawaban terlebih dahulu.");
    }
}

function calculateResult() {
    let score = answers.reduce((a, b) => a + b, 0);
    const name = document.getElementById("name").value || "Pengguna";
    let nickname = "";
    let description = "";

    // Menentukan julukan berdasarkan skor
    for (let range of nicknames) {
        if (score >= range.range[0] && score <= range.range[1]) {
            nickname = range.nickname;
            description = range.description;
            break;
        }
    }

    document.getElementById("nickname").textContent = `Julukan: ${nickname}`;
    document.getElementById("description").textContent = description;

    document.getElementById("quizPage").style.display = "none";
    document.getElementById("resultPage").style.display = "block";
}

function restartQuiz() {
    document.getElementById("resultPage").style.display = "none";
    document.getElementById("startPage").style.display = "block";
    document.getElementById("name").value = "";
    answers = [];
    currentQuestion = 0;
}
