let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let board = [];
let targetWord = "";
let validWords = [];
let previousGuesses = [];

targetWord = wordlist[Math.trunc(Math.random() * wordlist.length)];

function createBoard() {
  const boardEl = document.getElementById("board");
  boardEl.innerHTML = "";
  board = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    const rowEl = document.createElement("div");
    rowEl.classList.add("row");
    for (let j = 0; j < 5; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      rowEl.appendChild(tile);
      row.push(tile);
    }
    boardEl.appendChild(rowEl);
    board.push(row);
  }
}

function createKeyboard() {
  const keyboardLayout = {
    row1: "qwertyuiop".split("").concat("Del"),
    row2: "asdfghjkl".split("").concat("Enter"),
    row3: "zxcvbnm".split(""),
  };
  const keyboardSection = document.getElementById("keyboard-section");
  keyboardSection.innerHTML = "";

  Object.values(keyboardLayout).forEach((rowKeys) => {
    const row = document.createElement("div");
    row.classList.add("keyboard");

    rowKeys.forEach((k) => {
      const key = document.createElement("button");
      key.textContent = k;
      key.classList.add("key");
      key.addEventListener("click", () => {
        if (k === "Del") handleKey("Backspace");
        else handleKey(k);
      });

      row.appendChild(key);
    });
    keyboardSection.appendChild(row);
  });
}

function handleKey(key) {
  // if (gameOver) return;
  if (key === "Backspace") {
    if (currentCol > 0) {
      currentCol--;
      board[currentRow][currentCol].textContent = "";
    }
  } else if (key === "Enter") {
    if (currentCol === 5) {
      const guess = board[currentRow]
        .map((t) => t.textContent)
        .join("")
        .toLowerCase();
      if (!wordlist.includes(guess)) {
        showMessage("Invalid word");
        return;
      }
      if (previousGuesses.includes(guess)) {
        showMessage("Word already guessed");
        return;
      }
      previousGuesses.push(guess);
      checkGuess(guess);
    } else {
      showMessage("Not enough letters");
    }
  } else if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
    board[currentRow][currentCol].textContent = key;
    currentCol++;
  }
}

function checkGuess(guess) {
  if (guess.length !== 5) return;
  const row = board[currentRow];
  const letterCount = {};

  for (let l of targetWord) {
    letterCount[l] = (letterCount[l] || 0) + 1;
  }

  for (let i = 0; i < 5; i++) {
    if (guess[i] === targetWord[i]) {
      row[i].classList.add("correct");
      updateKeyboardColors(guess[i], "correct");
      letterCount[guess[i]]--;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (!row[i].classList.contains("correct")) {
      if (targetWord.includes(guess[i]) && letterCount[guess[i]] > 0) {
        row[i].classList.add("present");
        updateKeyboardColors(guess[i], "present");
        letterCount[guess[i]]--;
      } else {
        row[i].classList.add("absent");
        updateKeyboardColors(guess[i], "absent");
      }
    }
  }

  if (guess === targetWord) {
    showMessage("You win");
    gameOver = true;
    document.getElementById("restart").style.display = "inline-block";
  } else if (currentRow === 5) {
    showMessage(`The word was: ${targetWord}`);
    gameOver = true;
    document.getElementById("restart").style.display = "inline-block";
  } else {
    currentRow++;
    currentCol = 0;
  }
}

function updateKeyboardColors(letter, status) {
  const keys = document.querySelectorAll(".key");
  keys.forEach((k) => {
    if (k.textContent.toLocaleLowerCase() === k) {
      k.classList.remove("correct", "present", "absent");
      k.classList.add(status);
    }
  });
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
  setTimeout(() => {
    document.getElementById("message").textContent = "";
  }, 2000);
}

function restartGame() {
  currentRow = 0;
  currentCol = 0;
  gameOver = false;
  previousGuesses = [];
  document.getElementById("restart").style.display = "none";
  document.getElementById("message").textContent = "";
  targetWord = wordlist[Math.trunc(Math.random() * wordlist.length)];
  createBoard();
  createKeyboard();
}

document.getElementById("restart").addEventListener("click", restartGame);
createBoard();
createKeyboard();
window.addEventListener("keydown", (e) => handleKey(e.key));
