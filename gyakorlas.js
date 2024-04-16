const playBtn = document.querySelector("#button");
const levelSelect = document.querySelector("#level");
const guessInput = document.querySelector("#guess");
const guessForm = document.querySelector("#guess-form");
const levelDescDiv = document.querySelector("#level-desc");
let level = 0;
let guessNumber = 0;
let max = 0;

levelSelect.addEventListener("change", function() {
    level = parseInt(this.value);

    if(level !== 0) {
        max = 10 ** level;
        guessForm.classList.remove("display-none");
        guessNumber = Math.floor(Math.random * max) + 1;
        console.log(guessNumber);

        levelDescDiv.innerHTML = `<h4>a számok 1-től ${max}-ig lehetnek</h4>`
        
    } else {
        guessForm.classList.add("display-none");
    }
});

playBtn.addEventListener("click", function() {
    const guess = parseInt(guessInput.value);

    if(isNaN(guess)) {
        alert("Nem jól töltötted ki az input mezőt!");
        return;
    }

    if(guess > max) {
        alert(`A számanak 1 és ${max} között kell lennie`);
    }

    if(guess > guessNumber) {
        alert("Írj be kisebb számot!");
    } else if(guess < guessNumber) {
        alert("Írj be nagyobb számot!");
    } else {
        alert("Nyertél");
    }

});