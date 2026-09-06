const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});


function handleCellClick(event) {

    const cell = event.target;

    const index = cell.dataset.index;

    // لو الخانة متاخدة أو اللعبة خلصت
    if (board[index] !== "" || !gameActive) {
        return;
    }

    // حط اللاعب الحالي
    board[index] = currentPlayer;

    cell.textContent = currentPlayer;

    cell.classList.add(currentPlayer.toLowerCase());

    checkWinner();
}


function checkWinner() {

    let winningCombination = null;

    for (const combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            winningCombination = combination;
            break;
        }
    }

    // فيه فائز
    if (winningCombination) {

        gameActive = false;

        winningCombination.forEach(index => {
            cells[index].classList.add("winner");
        });

        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;

        return;
    }

    // تعادل
    if (!board.includes("")) {

        gameActive = false;

        statusText.textContent = "It's a Draw! 🤝";

        return;
    }

    // تبديل اللاعب
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}


restartBtn.addEventListener("click", restartGame);


function restartGame() {

    board = ["", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("winner");

    });
}