import React, { useState } from 'react';
import Cell from './Cell'

import styles from './index.module.scss'

type Difficulty = 'easy' | 'medium' | 'hard';
export enum CellState {
  show,
  hide,
  flag,
  mark
}

interface IMinesweeperProps {
  size: number,
  difficulty: Difficulty
}

const Minesweeper: React.FC<IMinesweeperProps> = ({size, difficulty}) => {
  const data: Array<number> =
    [
    2, 9, 3, 1,
    3, 0, 9, 1,
    0, 0, 0, 2,
    0, 0, 0, 9];

  const [state, setState] = useState<Array<CellState>>(getInitialState());
  // const [finish, setFinish] = useState<[boolean, boolean]>([false, false]); // запилить через контекст, туда же время

  function checkTurn(cellId: number, buttons: number): void {
    console.log(cellId, buttons);
    switch (buttons) {
      case 1:
        setState((prevState) => {
          let newState = [...prevState];
          newState[cellId] = CellState.show;
          return newState;
        });
        break;
      case 2:
        setState((prevState) => {
          let newState = [...prevState];
          newState[cellId] = CellState.flag;
          return newState;
        });
        break;
      case 4:
        setState((prevState) => {
          let newState = [...prevState];
          newState[cellId] = CellState.mark;
          return newState;
        });
        break;
      default: return;
    }
    console.log(state); 
  }

  const cells = (): JSX.Element[] => {
    return data.map((cell, index) => <Cell value={cell} key={index} index={index} onTurn={checkTurn} show={state[index]} />)
  }

  function getInitialState(): Array<CellState> {
    return new Array(size*size).fill(CellState.hide);
  }

  return (
    <div style={{width: `${size*25}px`}} className={styles.field}>
      { cells() }
    </div>
  )
}

export default Minesweeper;
