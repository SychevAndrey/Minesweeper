import React from 'react';
import Navbar from './components/Navbar';
import Minesweeper from './pages/game';
import Info from './pages/Info';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { GameProvider } from './pages/game/GameContext';

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route component={Minesweeper} path='/' exact />
            <Route component={Info} path='/info' />
          </Switch>
        </div>
      </BrowserRouter>
    </GameProvider>
	);
}

export default App;
