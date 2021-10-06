const BOMB = '💣';
const FLAG = '🚩'
const START = '😄';
const LOSE = '🤯';
const WIN = '😎';


var gBoard = [];
vargGamerPos = { i: 2, j: 9 };
var gGame = { isOn: false, 
    shownCount: 0, 
    markedCount: 0,
    secsPassed: 0, }

var gLevel1 = { SIZE: 4, MINES: 2 };
var gLevel2 = { SIZE: 8, MINES: 12 };
var gLevel3 = { SIZE:12, MINES:30};
var gSeconds = 0;
let interval;
let gSize;
let lifes = 3;

var gCell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };

//InIt
function init(){
    buildBoard(gLevel1.SIZE,gLevel1.MINES)
    renderBoard(gBoard)
}
//Build Board
function buildBoard(num,MINES) {
    var board = [];
    for (var i = 0; i < num; i++) {
        board[i] = [];
        for (var j = 0; j < num; j++) {
            board[i][j] = { ...gCell }

        }
    }
    for (var i =0; i < MINES;i++){
        var randID1 = Math.floor(Math.random()*num)
        var randID2 = Math.floor(Math.random()*num)
        board[randID1][randID2] = { minesAroundCount: 0, isShown: false, isMine: true, isMarked: false }
    }
    
  
    gBoard = board;
    gSize = { SIZE: num, MINES };
    const status = document.querySelector('.start-Button');
    status.innerText = START;
    gGame.isOn = true;
    renderBoard(gBoard);

}

//render the matrix to Html
function renderBoard(gBoard) {
    
    var strHtml = '';
    
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            
            strHtml += renderCell(i, j, gBoard[i][j]);
        }
        strHtml += '</tr>';
        
    }

    var elMat = document.querySelector('.Board');
    elMat.innerHTML = strHtml;

    document.querySelector('.lifes').innerText = lifes;
     
    console.table(gBoard)
}
//The click Function
/* function cellClicked(this){

} */

function checkWin() {
    var foundNonBombCell = false;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isMine === false && gBoard[i][j].isShown === false) {
                foundNonBombCell = true;
            }
            if (foundNonBombCell) {
                break;
            }
        }
    }

    if (foundNonBombCell === false) {
        gGame.isOn = false;
        const status = document.querySelector('.start-Button');
        status.innerText = WIN;  
        stopTimer();
    }
}

function stopTimer() {
    clearInterval(interval);
    gSeconds = 0;  
}

function cellClicked(elCell){
    if (!gGame.isOn) {
        return;
    }
    if (gSeconds === 0) {
        gSeconds = Date.now();
        const timerElem = document.querySelector('.time');
        interval = setInterval(() => {
            timerElem.innerText = parseInt((Date.now() - gSeconds) / 1000);
        }, 1000)
    }

    const i = parseInt(elCell.getAttribute('row'));
    const j = parseInt(elCell.getAttribute('col'));
    console.log('clicked on ', i, j, gBoard[i][j])
    gBoard[i][j].isShown = true;
    if (gBoard[i][j].isMine) {
        gGame.isOn = false;
        const status = document.querySelector('.start-Button');
        status.innerText = LOSE;
        renderBoard(gBoard);
        if (lifes === 1) {
            alert('you lost!!');
            lifes--;
        }
        else {
            lifes--;
        }
        stopTimer();
    } 
    else {
        renderBoard(gBoard);
        checkWin();    
    }
}

function incrementSeconds() {
    var elTime = document.querySelector('.time');
    gSeconds++;
    elTime.innerText = gSeconds;
}
function resetTimer(){
    var elTime = document.querySelector('.time');

    gSeconds = 0
    elTime.innerText = gSeconds;
}

function renderBtn(){

}

function cellRightClicked(elCell, event) {
    const i = parseInt(elCell.getAttribute('row'));
    const j = parseInt(elCell.getAttribute('col'));
    //console.log('right clicked on ', i, j, gBoard[i][j])
    gBoard[i][j].isMarked = true;
    renderBoard(gBoard);



    elCell.innerText = FLAG;
    
    event.preventDefault();
}

function renderCell(i, j, value) {
    var tdId = 'cell-' + i + '-' + j;
    if (value.isShown) {
        const tdContent = value.isMine ? BOMB : '';
        return `<td id="${tdId}" row="${i}" col="${j}" class="shown" onclick="cellClicked(this)" oncontextmenu="cellRightClicked(this, event)">${tdContent}</td>`;
    }
    else {
        const tdContent = value.isMarked ? FLAG : '';
        return `<td id="${tdId}" row="${i}" col="${j}" class="hidden" onclick="cellClicked(this)" oncontextmenu="cellRightClicked(this, event)">${tdContent}</td>`;
    }

}



for(var i =0;i < gBoard.length;i++){
    var tdId = 'cell-' + i + '-' + j;
    var elCell = document.getElementsByClassName(tdId);
    elCell.innerHTML = BOMB;
	
    
}
console.log(elCell) 