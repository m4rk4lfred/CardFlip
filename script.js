let boardCellContainer = [];
let cellCompare = [];
let squareSoldier = "https://www.pngplay.com/wp-content/uploads/13/Squid-Game-Soldier-Mask-Face-PNG.png";
let frontMan = "https://cdn3d.iconscout.com/3d/free/thumb/free-front-man-mask-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--squid-game-squidgame-face-pack-sports-games-illustrations-3770325.png?f=webp";
let card = "https://pngimg.com/uploads/squid_game/squid_game_PNG20.png";
let umbrella = "https://cdn3d.iconscout.com/3d/free/thumb/free-umbrella-dalgona-candy-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-chocolate-squid-game-pack-sports-games-illustrations-3770321.png?f=webp";
let circle = "https://cdn3d.iconscout.com/3d/free/thumb/free-circle-dalgona-candy-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--delicious-logo-squid-game-pack-sports-games-illustrations-3770317.png?f=webp";
let circleSoldier = "https://www.pngplay.com/wp-content/uploads/13/Squid-Game-Soldier-Circle-PNG.png";
let squidgameText = "https://www.pngplay.com/wp-content/uploads/13/Squid-Game-Official-Logo-PNG.png";
let doll = "https://i.seadn.io/gae/0-U-NrEUp3I8MSg-0jPHQq6lvqCVn1GbpBQYMhh91S_Z2Q6CiNj_uF09avHX6qyWyHvBfiShJIhVR1BOqkbmn71wtaHeBfhapkPgLw?auto=format&dpr=1&w=1000";
let numberMistakes = 0;
let numberMove = 0;
let cellValue = [
                 [squareSoldier, frontMan, card, umbrella],
                 [circle, squareSoldier, doll, doll],
                 [card, squidgameText, squidgameText, frontMan],
                 [circle, umbrella, circleSoldier, circleSoldier]
                ]
let flipped = 0;


function populateCells(){ 
    let board = document.getElementById('board');
    for(let row = 0 ; row < 4 ; row++){
        let rowArray=[];
        for(let col = 0 ; col < 4 ; col++){
            let createCell = document.createElement('div');
            createCell.classList.add('boardCell');
            createCell.id =`boardCell:${row}${col}`;
            rowArray.push(createCell);
            createCell.addEventListener('click' , () => flipCard(createCell));
            board.append(createCell);
        }
        boardCellContainer.push(rowArray);
    }
}

function flipCard(cell){
    if(flipped < 2){
        cellCompare.push(cell.id); 
        console.log("cell" +cell.id);
        let splitId = cell.id.split(":")[1];
        let row = parseInt(splitId[0],10);
        let col = parseInt(splitId[1],10);
        flipped++;   
        cell.style.backgroundColor = 'rgba(222,57,126,255)';
        showImageCells(row , col ,flipped);
        
        if(flipped == 2){
            let card1 = cellCompare[0].split(':')[1];
            let card2 = cellCompare[1].split(':')[1];
            setTimeout(() => {checkCard(card1 , card2);checkWin()}, 500);
            
        }
        

    }
}
  
 function checkCard(card1 , card2){
    let card1Row = parseInt(card1[0], 10);
    let card1Col = parseInt(card1[1], 10); 
    let card2Row = parseInt(card2[0], 10);
    let card2Col = parseInt(card2[1], 10); 

   
    if(cellValue[card1Row][card1Col] == cellValue[card2Row][card2Col]){
       
        boardCellContainer[card1Row][card1Col].style.pointerEvents = 'none';
        boardCellContainer[card2Row][card2Col].style.pointerEvents = 'none';
        numberMove++;
        updateScore(numberMistakes , numberMove);
        alert('win');
        
    }
    else{
        boardCellContainer[card1Row][card1Col].style.backgroundColor = 'rgba(166,212,235,255)';
        boardCellContainer[card2Row][card2Col].style.backgroundColor = 'rgba(166,212,235,255)';
        boardCellContainer[card1Row][card1Col].innerHTML = '';
        boardCellContainer[card2Row][card2Col].innerHTML = '';
        numberMistakes++;
        numberMove++;
        updateScore(numberMistakes , numberMove);
        
        alert('wrong');
    }
    cellCompare = [];
    flipped = 0;

 }


 function showImageCells(Row , Col , flipped){
        let firstboardToAccess = document.getElementById(`boardCell:${Row}${Col}`);
        let Image = document.createElement('img');
        Image.classList.add("cellImage");
        Image.src = cellValue[Row][Col];
        firstboardToAccess.append(Image);


    
 }
 function showBoard(){
    for(let i = 0 ; i < 4 ; i++){
        for(let j = 0 ; j < 4 ;j++ ){
            console.log(boardCellContainer[i][j].id);
        }
    }
 }

 function checkWin(){
    let winner = true;
    for(let row = 0 ; row < 4 ; row++){
        for(let col = 0 ; col < 4 ; col++){
          let computedStyle = window.getComputedStyle(boardCellContainer[row][col]);

          if(computedStyle.pointerEvents != 'none'){
             winner = false;
          }
        }
        if(!winner){break;}
    }

    if(winner){
          alert("YOU WON");
          numberMistakes = 0;
          numberMove = 0;
          updateScore(numberMistakes , numberMove);
    }
 }

function updateScore(mistakeScore , moveScore){
    let mistake = document.getElementById('mistakes');
    let moves = document.getElementById('moves');

    mistake.innerHTML = `MISTAKES: ${mistakeScore}`;
    moves.innerHTML = `MOVES: ${moveScore}`;
}


populateCells();
showBoard();
