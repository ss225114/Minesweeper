import { useContext } from "react"
import { BoardContext } from "../BoardContextProvider"


const UseBoardContext = () => {
  return useContext(BoardContext);
}

export default UseBoardContext