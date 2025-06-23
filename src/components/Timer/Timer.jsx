/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import UseBoardContext from "../Board/contexts/features/UseBoardContext";

const Timer = () => {

  const {time, setTime, isActive, setIsActive, formatTime} = UseBoardContext();

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      console.log(formatTime());
      
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <>
        <h2>Timer: {formatTime()}</h2>
    </>
  )
}

export default Timer