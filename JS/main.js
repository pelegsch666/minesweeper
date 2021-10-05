const BOMB = '💣';
const FLAG = '🚩'
const START = '😄';
const LOSE = '🤯';
const WIN = '😎';


var gBoard = [];

var gGame = { isOn: false, 
    shownCount: 0, 
    markedCount: 0,
    secsPassed: 0, }

var gLevel1 = { SIZE: 4, MINES: 2 };
var gLevel2 = { SIZE: 8, MINES: 12 };
var gLevel3 = { SIZE:12, MINES:30};
var gSeconds = 0

var gCell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false }

//InIt
function init(){
    gBoard = buildBoard(gLevel1.SIZE,gLevel1.MINES)
    renderBoard(gBoard)
    renderLayer(gBoard)
}
//Build Board
function buildBoard(num,MINES) {
   
    var board = [];
    for (var i = 0; i < num; i++) {
        board[i] = [];
        for (var j = 0; j < num; j++) {
            board[i][j] = gCell

        }
    }
    for (var i =0; i < MINES;i++){
        var randID1 = Math.floor(Math.random()*num)
        var randID2 = Math.floor(Math.random()*num)
        board[randID1][randID2] = BOMB 
      
    }

  
    return board;

}

//render the matrix to Html
function renderBoard(gBoard) {
    var className = 'barbie'
    var strHtml = '';
    
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="' + className + '">'+'</td>';
        }
        strHtml += '</tr>';
        
    }

    var elMat = document.querySelector('.Board');
    elMat.innerHTML = strHtml;
     
    console.table(gBoard)
}
//The click Function
/* function cellClicked(this){

} */
//function cellClicked(elCell, i, j){

//}

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