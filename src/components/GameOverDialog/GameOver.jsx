/* eslint-disable no-unused-vars */
import UseBoardContext from "../Board/contexts/features/UseBoardContext"
import sad from "../../assets/images/sadEmoji.webp"

const GameOver = () => {

    const {time, formatTime} = UseBoardContext();

  return (
    <dialog open className="inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-row justify-around">
        <div>
        <h2 className="text-2xl text-black font-bold">Game Over!</h2>
        <p className="mt-2 text-black">You hit a bomb!</p>
        <p className="mt-4 text-black">Time : {formatTime()}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
        </div>
        <div>
            <img className="w-36" src={sad}/>
        </div>
      </div>
    </dialog>
  )
}

export default GameOver