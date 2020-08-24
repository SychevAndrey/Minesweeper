import React from 'react';
import Navbar from './components/Navbar';
import Minesweeper, { Difficulty } from './components/Minesweeper';

function App() {
  return (
		<>
      <Navbar />
      <Minesweeper size={4} difficulty={Difficulty.medium} />
		</>
	);
}

export default App;
