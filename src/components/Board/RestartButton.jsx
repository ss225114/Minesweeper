import UseBoardContext from "./contexts/features/UseBoardContext"

const RestartButton = () => {

    const {handleRestart} = UseBoardContext();
  return (
    <button
        className="border-2 border-black rounded-md bg-lime-800 p-5"
        onClick={handleRestart}
      >
        RESTART
      </button>
  )
}

export default RestartButton