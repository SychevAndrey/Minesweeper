import React from 'react';
import Navbar from './components/Navbar';
import Minesweeper from './components/Minesweeper';

function App() {
  return (
		<>
      <Navbar />
      <Minesweeper size={4} difficulty="medium" />
		</>
	);
}

export default App;
