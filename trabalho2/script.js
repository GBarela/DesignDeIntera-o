window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const jogadorDisplay = document.querySelector('.display-jogador');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
F
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentjogador = 'X';
    let isGameActive = true;

    const JOGADORX_WON = 'JOGADORX_WON';
    const JOGADORO_WON = 'JOGADORO_WON';
    const EMPATE = 'EMPATE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

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

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentjogador === 'X' ? JOGADORX_WON : JOGADORO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(EMPATE);
    }

    const announce = (type) => {
        switch(type){
            case JOGADORO_WON:
                announcer.innerHTML = 'jogador <span class="jogadorO">O</span> Won';
                break;
            case JOGADORX_WON:
                announcer.innerHTML = 'jogador <span class="jogadorX">X</span> Won';
                break;
            case EMPATE:
                announcer.innerText = 'EMPATE';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentJogador;
    }

    const changeJogador = () => {
        jogadorDisplay.classList.remove(`jogador${currentJogador}`);
        currentJogador = currentJogador === 'X' ? 'O' : 'X';
        jogadorDisplay.innerText = currentJogador;
        jogadorDisplay.classList.add(`jogador${currentJogador}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentJogador;
            tile.classList.add(`jogador${currentJogador}`);
            updateBoard(index);
            handleResultValidation();
            changeJogador();
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentJogador === 'O') {
            changeJogador();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('jogadorX');
            tile.classList.remove('jogadorO');
        });
    }

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
