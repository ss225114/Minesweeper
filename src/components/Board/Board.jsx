/* eslint-disable no-unused-vars */

import RowBox from "../RowBox/RowBox";
import UseBoardContext from "./contexts/features/UseBoardContext";
import RestartButton from "./RestartButton";
import Timer from "../Timer/Timer";
import Win from "../WinDialog/Win";
import GameOver from "../GameOverDialog/GameOver";
import bomb from "../../assets/images/bomb.png"



const Board = () => {
  const {tempArr, board, play, win, bombClicked, setBoard, setPlay, setWin, setBombClicked, handleStop, randomArrangement} = UseBoardContext();

 
  

  return (
    <>

    <div className="mt-10 flex flex-row justify-center items-center gap-10">
    <div className="flex flex-row"><img className="h-8 w-8" src={bomb}/>&nbsp; : 10</div>
    <RestartButton/>
    <Timer/>
    </div>
      
      <div className="min-h-screen flex flex-col items-center mt-10">
        {/* {bombClicked ? <div>GAME OVER!!!</div> : null}
        {win ? <div>YOU WIN!!!</div> : null} */}
        {board.map((cell, rowIndex) => (
          <RowBox
            cells={cell}
            rowIndex={rowIndex}
            key={rowIndex}
          />
        ))}
      </div>
      {win ? <Win /> : bombClicked ? <GameOver /> : null}
    </>
  );
};

export default Board;

// for(let i=0; i<9; i++){
//   for(let j=0; j<9; j++){
//     if(tempArr[i][j] === "Bomb"){
//       setBomb(prev => prev + 1);
//     }
//   }
// }

// const randomArrangement = (row, col) => {
//   console.log("random arrangement done!!");

//   while (bombCount != 0) {
//     let idx = randomIndex();
//     // console.log(idx);
//     if (
//       tempArr[idx.ridx][idx.cidx] == 0 &&
//       idx.ridx != row &&
//       idx.cidx != col
//     ) {
//       tempArr[idx.ridx][idx.cidx] = "Bomb";
//       bombCount = bombCount - 1;
//     }
//   }
//   console.log("randomly arranged array:", tempArr);
//   setBoard([...tempArr]);
//   return tempArr;
// };
