/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Board from './components/Board/Board'
import BoardContextProvider from './components/Board/contexts/BoardContextProvider'


function App() {


  return (
    <BoardContextProvider>
      <Board/>
    </BoardContextProvider>
  )
}

export default App
