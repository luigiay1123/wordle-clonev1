let currentRow = 0;
let currentCol = 0;
let gameOver = false;
let board = [];
let targetWord = "";
let validWords = [];
let previousGuesses = [];

const word = wordlist[Math.trunc(Math.random * wordlist.length)];

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
  const keys1 = "qwertyuiop".split("");
  const keyboard1 = document.getElementById("keyboard1");
  keyboard1.innerHTML = "";
  keys1.forEach((k) => {
    const key = document.createElement("button");
    key.textContent = k;
    key.classList.add("key");
    key.addEventListener("click", () => handleKey(k));
    keyboard1.appendChild(key);
  });
  const del = document.createElement("button");
  del.textContent = "Del";
  del.classList.add("key");
  del.addEventListener("click", () => handleKey("Backspace"));
  keyboard1.appendChild(del);
  const keys2 = "asdfghjkl".split("");
  const keyboard2 = document.getElementById("keyboard2");
  keyboard2.innerHTML = "";
  keys2.forEach((k) => {
    const key = document.createElement("button");
    key.textContent = k;
    key.classList.add("key");
    key.addEventListener("click", () => handleKey(k));
    keyboard2.appendChild(key);
  });
  const enter = document.createElement("button");
  enter.textContent = "Enter";
  enter.classList.add("key");
  enter.addEventListener("click", () => handleKey("Enter"));
  keyboard2.appendChild(enter);
  const keys3 = "zxcvbnm".split("");
  const keyboard3 = document.getElementById("keyboard3");
  keyboard3.innerHTML = "";
  keys3.forEach((k) => {
    const key = document.createElement("button");
    key.textContent = k;
    key.classList.add("key");
    key.addEventListener("click", () => handleKey(k));
    keyboard3.appendChild(key);
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
