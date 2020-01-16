init();
setup();

function init() {

    // Game Variables

    window.currentID = 0;
    window.currentMoney = [50, 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 500000, 1000000];

    window.question;
    window.answers;
    window.correctAnswer;

    window.gameStatus = 'start';

    //hud

    window.hud_q = document.getElementById('question');

    window.hud = [
        document.getElementById('opt_a'),
        document.getElementById('opt_b'),
        document.getElementById('opt_c'),
        document.getElementById('opt_d')
    ];

    window.hud_action = [
        document.getElementById('hud_a'),
        document.getElementById('hud_b'),
        document.getElementById('hud_c'),
        document.getElementById('hud_d')
    ];

    window.hud_id = document.getElementById('q_id');
    window.hud_money = document.getElementById('currentprice');
    window.hud_end = document.getElementById('endgame');
    
    window.hud_next = document.getElementById('next');


    // questions

    window.questions = [
        // id, questions, correct answer, w. answer, w. answer, w. answer
        [0, 'Wie heißt meine Freundin?', 'Joy', 'Caro', 'Mia', 'Luisa'],
        [1, 'Wie heitßt mein Freund?', 'Michael', 'Julian', 'Luis', 'Marko'],
    ];
}


function setup() {
    //init function
    create_EventListeners();
    
    
    nextRound();
}

function nextRound() {
    if(gameStatus == 'correct' || gameStatus == 'start') {
        //game logic
        gameStatus = 'ingame';
        update_hud();
        update_question_hud();
        draw_question();
    } else {
        L(gameStatus);
    }
    
}

function draw_question() {
    question = questions[0];

    // mix answers
    answers = [];

    for (let i = 0; i < 4; i++) {
        answers.push(question[2 + i])
    }

    shuffleArray(answers);

    // draw 
    hud_q.innerHTML = question[1];

    for (let i = 0; i < 4; i++) {
        hud[i].innerHTML = answers[i];
    }

}

function clicked_question(id) {
    if (gameStatus == 'ingame') {
        correctAnswer = false;
        for (let i = 0; i < 4; i++) {
            if (question[2] == answers[i] && i == id) {
                hud_action[i].style = 'background-color: #00ff00';
                correctAnswer = true;
            } else if (question[2] == answers[i]) {
                hud_action[i].style = 'background-color: #00ff00';
            } else if (i == id) {
                hud_action[i].style = 'background-color: #ff0000';
            }
        }
        if (correctAnswer == true) {
            gameStatus = 'correct';
        } else {
            gameStatus = 'lose';
        }
        update_gameStatus();
        L(correctAnswer);
    }
}


function update_gameStatus() {
    if (gameStatus == 'correct') {
        currentID++;
    } else if (gameStatus == 'lose') {
        //lost
        L('Lost Game');
    }
}

function update_question_hud() {
    for (let i = 0; i < 4; i++) {
        hud_action[i].style = 'background-color: #ffffff';
    }
}

function update_hud() {
    hud_id.innerHTML = currentID + 1;
    hud_money.innerHTML = currentMoney[currentID];
}

function create_EventListeners() {
    hud_action[0].addEventListener('click', function () {
        clicked_question(0);
    });
    hud_action[1].addEventListener('click', function () {
        clicked_question(1);
    });
    hud_action[2].addEventListener('click', function () {
        clicked_question(2);
    });
    hud_action[3].addEventListener('click', function () {
        clicked_question(3);
    });
    hud_next.addEventListener('click', function () {
        nextRound();
    });
}



// Utility 

function L(i) {
    console.log(i);
}


function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d
};
