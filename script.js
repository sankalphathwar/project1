document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const modalClose = document.getElementById("modal-close");
    let currentPlayer = "X";
    let gameOver = false;
  
    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.index = i;
      cell.addEventListener("click", () => handleCellClick(cell));
      board.appendChild(cell);
    }
  
    // Handle cell click
    function handleCellClick(cell) {
      if (!gameOver && !cell.textContent) {
        cell.textContent = currentPlayer;
        if (checkWinner()) {
          displayWinnerModal(`Player ${currentPlayer} wins!`);
          gameOver = true;
        } else if (isBoardFull()) {
          displayWinnerModal("It's a draw!");
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  
    // Display winner modal
    function displayWinnerModal(message) {
      modalContent.textContent = message;
      modal.style.display = "flex";
    }
  
    // Check for a winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
          board.children[a].textContent &&
          board.children[a].textContent === board.children[b].textContent &&
          board.children[b].textContent === board.children[c].textContent
        ) {
          return true;
        }
      }
  
      return false;
    }
  
    // Check if the board is full (a draw)
    function isBoardFull() {
      for (const cell of board.children) {
        if (!cell.textContent) {
          return false;
        }
      }
      return true;
    }
  
    // Reset the game
    function resetGame() {
      for (const cell of board.children) {
        cell.textContent = "";
      }
  
      modal.style.display = "none";
      gameOver = false;
      currentPlayer = "X";
    }
  
    // Close modal on close button click
    modalClose.addEventListener("click", () => {
      resetGame();
    });
  
    // Close modal on outside click
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        resetGame();
      }
    });
  });
  