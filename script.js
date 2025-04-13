let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let board = [];
let targetWord = "";
let validWords = [];
let previousGuesses = [];

let word = wordlist[Math.trunc(Math.random() * wordlist.length)];

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
      currentRow++;
      currentCol = 0;
    } else {
      showMessage("Not enough letters");
    }
  } else if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
    board[currentRow][currentCol].textContent = key;
    currentCol++;
  }
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
  setTimeout(() => {
    document.getElementById("message").textContent = "";
  }, 2000);
}

createBoard();
createKeyboard();
window.addEventListener("keydown", (e) => handleKey(e.key));
