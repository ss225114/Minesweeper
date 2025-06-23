/* eslint-disable no-unused-vars */
import UseBoardContext from "../Board/contexts/features/UseBoardContext";
import happy from "../../assets/images/winEmoji.webp"

const Win = () => {
    const {time, formatTime} = UseBoardContext();
  return (
    <dialog
      open
      className="inset-0 h-screen w-screen flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-row justify-around">
        <div>
        <h2 className="text-2xl text-black font-bold">Congratulations!</h2>
        <p className="mt-2 text-black">You Win!</p>
        <p className="mt-4 text-black">Time : {formatTime()}</p>
        <button
          className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Play Again
        </button>
        </div>
        <div>
            <img className="w-36" src={happy}/>
        </div>
      </div>
    </dialog>
  );
};

export default Win;
