/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function setListeners() {
    for (const box of boxes)
    {
        box.addEventListener('click', select);
    }
}

function restart() {
    const result = document.getElementById("result");
    for(let property in choices){
        styleReset(property);
        delete choices[property];
    }
    setListeners();
    result.classList.add("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
}

function showAnswer(answer) {
    const result = document.getElementById("result");
    result.querySelector("h1").innerHTML = RESULTS_MAP[answer].title;
    result.querySelector("p").innerHTML = RESULTS_MAP[answer].contents;
    result.classList.remove("hidden")
    console.log(result);
}

function checkBoxes() {
    if (Object.keys(choices).length === 3) {
        for (const box of boxes)
        {
            box.removeEventListener('click', select);
        }
        let answer;
        answer = choices.two === choices.three ? choices.two : choices.one;
        showAnswer(answer);
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});
    }
}

function styleChange(choice, choiceNumber) {
        for (const box of boxes)
        {   
            if (box.dataset.questionId===choiceNumber) {
                box.classList.remove("unselected");
                box.classList.remove("selected");
                box.querySelector(".checkbox").src = "images/unchecked.png";
                if (box !== choice) {
                    box.classList.add("unselected");
                }
            }
        }
        choice.classList.add("selected");
        const image = choice.querySelector(".checkbox");
        image.src = "images/checked.png";
}

function styleReset(choiceNumber) {
    for (const box of boxes)
        {   
            if (box.dataset.questionId===choiceNumber) {
                box.classList.remove("unselected");
                box.classList.remove("selected");
                box.querySelector(".checkbox").src = "images/unchecked.png";
            }
        }
}

function select(event) {
    const choice = event.currentTarget;
    const choiceNumber = choice.dataset.questionId;
    //se viene selezionata una nuova casella:
    if (choice.className !== "selected") {
        //modifico lo stile delle 9 caselle relative alla scelta fatta
        styleChange(choice, choiceNumber);
        //aggiorno la mappa delle scelte
        choices[choice.dataset.questionId]=choice.dataset.choiceId;
        //controllo se sono state date tutte le risposte
        checkBoxes();
    //se viene selezionata la casella attiva:
    } else {
        //Ripristino lo stile delle caselle
        styleReset(choiceNumber);
        //Tolgo la scelta dalla mappa delle scelte
        delete choices[choice.dataset.questionId];
    }
    console.log(choices);
}

const boxes = document.querySelectorAll(".choice-grid div");
const choices = {};
setListeners();
const resetButton = document.getElementById("restart");
resetButton.addEventListener("click",restart);