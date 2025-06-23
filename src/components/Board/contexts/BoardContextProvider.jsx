/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const BoardContext = createContext({});

const arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const BoardContextProvider = ({ children }) => {
  const max = 8;
  const min = 0;
  let tempArr = arr.map((row) => [...row]);
  let bombCount = 10;

  const [board, setBoard] = useState([...tempArr]);
  const [play, setPlay] = useState(1);
  const [win, setWin] = useState(false);
  const [bombClicked, setBombClicked] = useState(false);

  const [time, setTime] = useState(0); 
  const [isActive, setIsActive] = useState(false);

  const randomArrangement = (row, col) => {
    console.log("Random arrangement done!!");
  
    // Create a fresh copy of the board
    let newBoard = board.map((row) => [...row]);
    let bombsLeft = 10;
    let totalRows = newBoard.length;
    let totalCols = newBoard[0].length;
  
    // Define safe zone (the selected cell and its 8 neighbors)
    const safeZone = new Set();
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let newRow = row + i;
        let newCol = col + j;
        if (newRow >= 0 && newRow < totalRows && newCol >= 0 && newCol < totalCols) {
          safeZone.add(`${newRow},${newCol}`);
        }
      }
    }
  
    // Function to get a random row and column index
    const randomIndex = () => ({
      ridx: Math.floor(Math.random() * totalRows),
      cidx: Math.floor(Math.random() * totalCols),
    });
  
    while (bombsLeft > 0) {
      let { ridx, cidx } = randomIndex();
      let indexKey = `${ridx},${cidx}`;
  
      if (newBoard[ridx][cidx] === 0 && !safeZone.has(indexKey)) {
        newBoard[ridx][cidx] = "Bomb";
        bombsLeft--;
        console.log(ridx, cidx, "->", bombsLeft);
      }
    }
  
    console.log("Randomly arranged board:", newBoard);
    setBoard(newBoard); // Set state properly
    return newBoard;
  };

  const handleRestart = () => {
    console.log("Resetting board...");

    // Create a new independent 2D array
    const newBoard = Array(9)
      .fill(null)
      .map(() => Array(9).fill(0));

    setBoard(newBoard);
    setPlay(1);
    setBombClicked(false);
    setWin(false);
    setTime(0);
    setIsActive(false);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleStop = () => {
    setIsActive(!isActive);
  };

  return (
    <BoardContext.Provider
      value={{
        max,
        min,
        tempArr,
        bombCount,
        handleRestart,
        handleStop,
        board,
        play,
        win,
        setWin,
        bombClicked,
        setBoard,
        setBombClicked,
        setPlay,
        time,
        setTime,
        isActive,
        setIsActive,
        formatTime,
        randomArrangement
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
