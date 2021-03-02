import React from 'react'

import '../styles/ticTacToe.css'

function TicTacToeBoard() {
  return (
    <div className="container">
      <div className="board">
        <div id="block0" className="block"></div>
        <div id="block1" className="block"></div>
        <div id="block2" className="block"></div>
        <div id="block3" className="block"></div>
        <div id="block4" className="block"></div>
        <div id="block5" className="block"></div>
        <div id="block6" className="block"></div>
        <div id="block7" className="block"></div>
        <div id="block8" className="block"></div>
      </div>
    </div>
  )
}

export default TicTacToeBoard;
