/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useMemo, useRef, useState } from "react";
import boom from "../../assets/images/boom.jpg"
import brick from "../../assets/images/brick.png"
import UseBoardContext from "../Board/contexts/features/UseBoardContext";


// const numColor = [
//   {
//     num: 1,
//     color: "text-blue-400"
//   },
//   {
//     num: 2,
//     color: "text-slate-600"
//   },
//   {
//     num: 3,
//     color: "text-yellow-200"
//   },
//   {
//     num: 4,
//     color: "text-red-400"
//   },
//   {
//     num: 5,
//     color: "text-orange-300"
//   }
// ];

const Cell = (props) => {
  const {
    item,
    rowIndex,
    colIndex
  } = props;

  const {randomArrangement, 
    board,
    setBoard,
    play,
    setPlay,
    setIsActive,
    setWin, 
    setBombClicked,
    bombClicked,
    handleStop} = UseBoardContext();

  const [textColor, setTextColor] = useState("");
  const firstClickRef = useRef(false);
  // const [win, setWin] = useState(false);
  // const [bombClicked, setBombClicked] = useState(false);

  const bombCount = (row, col, newBoard) => {
    console.log("starting count");
    
    let count = 0;
    //check for bombs
    //check down
    if (row + 1 < newBoard.length && newBoard[row + 1][col] === "Bomb") {
      count = count + 1;
    }
    //check up
    if (row - 1 >= 0 && newBoard[row - 1][col] === "Bomb") {
      count = count + 1;
    }
    //check right
    if (col + 1 < newBoard.length && newBoard[row][col + 1] === "Bomb") {
      count = count + 1;
    }
    //check left
    if (col - 1 >= 0 && newBoard[row][col - 1] === "Bomb") {
      count = count + 1;
    }
    //check top-left
    if (row - 1 >= 0 && col - 1 >= 0 && newBoard[row - 1][col - 1] === "Bomb") {
      count = count + 1;
    }
    //check top-right
    if (
      row - 1 >= 0 &&
      col + 1 < newBoard.length &&
      newBoard[row - 1][col + 1] === "Bomb"
    ) {
      count = count + 1;
    }
    //check bottom-left
    if (
      row + 1 < newBoard.length &&
      col - 1 >= 0 &&
      newBoard[row + 1][col - 1] === "Bomb"
    ) {
      count = count + 1;
    }
    //check bottom-right
    if (
      row + 1 < newBoard.length &&
      col + 1 < newBoard.length &&
      newBoard[row + 1][col + 1] === "Bomb"
    ) {
      count = count + 1;
    }
    console.log("total number of bombs around ", row, col, ":", count);
    return count;
  };

  function checkSurroundings(row, col, visited, newBoard) {
    if (
      row < 0 ||
      col < 0 ||
      row >= newBoard.length ||
      col >= newBoard.length ||
      visited[row][col] ||
      newBoard[row][col] === "Bomb"
    ) {
      return;
    }
  
    visited[row][col] = true;
  
    if (
      (row + 1 < board.length && board[row + 1][col] === "Bomb") ||
      (row - 1 >= 0 && board[row - 1][col] === "Bomb") ||
      (col + 1 < board.length && board[row][col + 1] === "Bomb") ||
      (col - 1 >= 0 && board[row][col - 1] === "Bomb") ||
      (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] === "Bomb") ||
      (row - 1 >= 0 &&
        col + 1 < board.length &&
        board[row - 1][col + 1] === "Bomb") ||
      (row + 1 < board.length &&
        col - 1 >= 0 &&
        board[row + 1][col - 1] === "Bomb") ||
      (row + 1 < board.length &&
        col + 1 < board.length &&
        board[row + 1][col + 1] === "Bomb")
    ) {
      newBoard[row][col] = bombCount(row, col, newBoard);
      return;
    }
  
    newBoard[row][col] = null; // Empty cell
    console.log(row, col, "->", item);
    
  
    checkSurroundings(row, col + 1, visited, newBoard);
    checkSurroundings(row, col - 1, visited, newBoard);
    checkSurroundings(row - 1, col, visited, newBoard);
    checkSurroundings(row + 1, col, visited, newBoard);
    checkSurroundings(row - 1, col - 1, visited, newBoard);
    checkSurroundings(row - 1, col + 1, visited, newBoard);
    checkSurroundings(row + 1, col - 1, visited, newBoard);
    checkSurroundings(row + 1, col + 1, visited, newBoard);
  }
  

  function reveal(row, col) {
    let newBoard = board.map(row => [...row]); // Create a fresh copy
    console.log("New board :", newBoard);
    
    let flag = false;
    console.log("fresh copy :", newBoard);

    // console.log(newBoard[row][col]);

    if (newBoard[row][col] === "Bomb"){
      revealAllBombs();
      handleStop();
      return;
    }

    if (newBoard[row][col] !== "Bomb") flag = true;
   
    if (flag) {
      const visited = Array.from({ length: newBoard.length }, () =>
        Array(newBoard[0].length).fill(false)
      );
      checkSurroundings(row, col, visited, newBoard);
      setBoard(newBoard);
      // console.log("board state : ", board);
      // console.log("tempArr data :", tempArr);
    }
  }

  const checkWin = () => {
    let unrevealedSafeCells = 0;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== "Bomb" && board[i][j] == 0) {
          unrevealedSafeCells++;
      }
      }
    }
    console.log(unrevealedSafeCells);
    if (unrevealedSafeCells === 0) {
      setWin(true);
      handleStop();
    }
  };

  const revealAllBombs = () => {
    setBombClicked(true);
    setWin(false);
  };

  const move = (row, col) => {
    reveal(row, col);
    // checkWin();
  };
  
  const handleClick = () => {
    console.log(rowIndex, colIndex);
    
    if (play) {
      console.log("First move - setting up board...");
  
      const newBoard = randomArrangement(rowIndex, colIndex);
      setBoard(newBoard); 
      setIsActive(true);
      setPlay(0);
      firstClickRef.current = true;
    } else {
      // console.log("Board state after first move:", board);
      move(rowIndex, colIndex); 
    }
  };
  
  useEffect(() => {
    if (firstClickRef.current && !play) {
      // console.log("First move completed and board is set:", board);
      move(rowIndex, colIndex); // Automatically reveal a cell after the first click
      firstClickRef.current = false;  // Reset the first click ref to prevent multiple calls
    }
  }, [board, play]); 

  useEffect(() => {
    checkWin();
  }, [board]); // Run checkWin whenever the board updates

  return (
    <>
      <div
        onClick={handleClick}
        className={`h-10 w-10 min-w-10 min-h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex justify-center items-center ${item === 1 ? "text-blue-400" : item === 2 ? "text-green-300" : item === 3 ? "text-yellow-200" : item === 4 ? "text-red-400" : item === 5 ? "text-orange-300" : "text-black"} font-medium cursor-pointer border-2 border-black rounded-md overflow-hidden text-2xl backdrop-brightness-125`}
      >
        {/* {item} */}
        {/* {win?<div>YOU WIN!!!</div>:null} */}
        {bombClicked && item == "Bomb"?<img className="w-full h-full object-cover" src={boom}/>:item == 0 || item == "Bomb"?<img src={brick}/>:item == null?item:item}
      </div>
    </>
  );
};

export default Cell;

// //check for bombs
// //check down
// if (row + 1 < tempArr.length && tempArr[row + 1][col] == "Bomb") {
// }
// //check up
// if (row - 1 > 0 && tempArr[row - 1][col] == "Bomb") {
// }
// //check right
// if (col + 1 < tempArr.length && tempArr[row][col + 1] == "Bomb") {
// }
// //check left
// if (col - 1 > 0 && tempArr[row][col - 1] == "Bomb") {
// }
// //check top-left
// if (row - 1 > 0 && col - 1 > 0 && tempArr[row - 1][col - 1] == "Bomb") {
// }
// //check top-right
// if (row - 1 > 0 && col + 1 < tempArr.length && tempArr[row - 1][col + 1] == "Bomb") {
// }
// //check bottom-left
// if (row + 1 < tempArr.length && col - 1 > 0 && tempArr[row + 1][col - 1] == "Bomb") {
// }
// //check bottom-right
// if (row + 1 < tempArr.length && col + 1 < tempArr.length && tempArr[row + 1][col + 1] == "Bomb") {
// }

// const randomArrangement = (row, col) => {
//   console.log("random arrangement done!!");

//   while (bombCount != 0) {
//     let idx = randomIndex();
//     // console.log(idx);
//     if (
//       array[idx.ridx][idx.cidx] == 0 &&
//       idx.ridx != row &&
//       idx.cidx != col
//     ) {
//       array[idx.ridx][idx.cidx] = "Bomb";
//       bombCount = bombCount - 1;
//     }
//   }
//   // array = tempArr.map(row => [...row]);
//   arr = array.map((row) => [...row]);
//   console.log("randomly arranged array:", arr);
//   return array;
// };



// function checkSurroundings(row, col, visited, newBoard) {
//   if (
//     row < 0 ||
//     col < 0 ||
//     row >= tempArr.length ||
//     col >= tempArr.length ||
//     visited[row][col] ||
//     board[row][col] === "Bomb"
//   ) {
//     return;
//   }

//   // Check if bomb is nearby
  // if (
  //   (row + 1 < board.length && board[row + 1][col] === "Bomb") ||
  //   (row - 1 >= 0 && board[row - 1][col] === "Bomb") ||
  //   (col + 1 < board.length && board[row][col + 1] === "Bomb") ||
  //   (col - 1 >= 0 && board[row][col - 1] === "Bomb") ||
  //   (row - 1 >= 0 && col - 1 >= 0 && board[row - 1][col - 1] === "Bomb") ||
  //   (row - 1 >= 0 &&
  //     col + 1 < board.length &&
  //     board[row - 1][col + 1] === "Bomb") ||
  //   (row + 1 < board.length &&
  //     col - 1 >= 0 &&
  //     board[row + 1][col - 1] === "Bomb") ||
  //   (row + 1 < board.length &&
  //     col + 1 < board.length &&
  //     board[row + 1][col + 1] === "Bomb")
  // ) {
  //   board[row][col] = bombCount(row, col);
  //   return;
  // }

//   visited[row][col] = true;

//   console.log("bomb not found");
//   board[row][col] = null;

//   checkSurroundings(row, col + 1, visited);
//   checkSurroundings(row, col - 1, visited);
//   checkSurroundings(row - 1, col, visited);
//   checkSurroundings(row + 1, col, visited);
//   checkSurroundings(row - 1, col - 1, visited);
//   checkSurroundings(row - 1, col + 1, visited);
//   checkSurroundings(row + 1, col - 1, visited);
//   checkSurroundings(row + 1, col + 1, visited);
// }


  // const handleClick = () => {
  //   //first move
  //   if (play) {
  //     // setBoard(board);
  //     ref = randomArrangement(rowIndex, colIndex);
  //     setBoard(ref);
  //     console.log("check :", ref);
  //     console.log("board state : ", board);
  //     move(rowIndex, colIndex);
  //     setPlay(0);
  //   } else {
  //     console.log("board state : ", board);
  //     move(rowIndex, colIndex);
  //   }
  // };