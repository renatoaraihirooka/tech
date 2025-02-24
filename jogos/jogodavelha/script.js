document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const difficultySelect = document.getElementById('difficulty');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const checkWin = () => {
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const checkDraw = () => {
        return board.every(cell => cell);
    };

    const handleCellClick = (e) => {
        const index = e.target.getAttribute('data-index');
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        if (checkWin()) {
            gameActive = false;
            //alert(`O jogador ${currentPlayer} venceu!`);
            alert(`Você venceu! Parabéns!`);
        } else if (checkDraw()) {
            gameActive = false;
            alert('Empate!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                handleComputerMove();
            }
        }
    };

    const handleComputerMove = () => {
        const difficulty = difficultySelect.value;
        let index;
        if (difficulty === 'easy') {
            index = getRandomMove();
        } else if (difficulty === 'medium') {
            index = getBestMove();
        } else {
            index = getBestMove(true);
        }
        if (index !== null) {
            board[index] = 'O';
            cells[index].textContent = 'O';
            if (checkWin()) {
                gameActive = false;
                alert('Você perdeu!!! Tente Novamente!');
            } else if (checkDraw()) {
                gameActive = false;
                alert('Empate!');
            } else {
                currentPlayer = 'X';
            }
        }
    };

    const getRandomMove = () => {
        const availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    };

    const getBestMove = (hard = false) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                if (checkWin()) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                if (checkWin()) {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        if (hard) {
            const corners = [0, 2, 6, 8];
            const availableCorners = corners.filter(index => board[index] === '');
            if (availableCorners.length > 0) {
                return availableCorners[Math.floor(Math.random() * availableCorners.length)];
            }
        }
        return getRandomMove();
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        cells.forEach(cell => cell.textContent = '');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});