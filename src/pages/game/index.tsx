import React, { useState, useEffect } from 'react';
import Cell from './Cell'
import Button from '../../components/common/Button'

import styles from './index.module.scss'

export enum Difficulty {
  easy,
  medium,
  hard
}

export enum CellState {
  show,
  hide,
  flag,
  mark
}

const Minesweeper: React.FC = () => {
  const data: Array<number> =
    [
    2, 9, 3, 1,
    3, 0, 9, 1,
    0, 0, 0, 2,
    0, 0, 0, 9];

  const [state, setState] = useState<Array<CellState>>(getInitialState(false));
  const [size, setSize] = useState<number>(4);
  // const [finish, setFinish] = useState<[boolean, boolean]>([false, false]); // запилить через контекст, туда же время

  function checkTurn(cellId: number, buttons: number): void {
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
  }

  useEffect(() => {
    localStorage.setItem('state', state.join(' '))
  }, [state])

  const cells = (): JSX.Element[] => {
    return data.map((cell, index) => <Cell value={cell} key={index} index={index} onTurn={checkTurn} show={state[index]} />)
  }

  function getInitialState(hardReset : boolean): Array<CellState> {
    const localState = localStorage.getItem('state')!.split(' ').map(item => parseInt(item));
    console.log(localState);
    return localState && !hardReset ? localState : new Array(size*size).fill(CellState.hide);
  }

  return (
    <>
    <div style={{width: `${size*30}px`}} className={styles.field}>
      { cells() }
    </div>
    <Button color='danger' onClick={() => setState(getInitialState(true))}>Начать заново</Button>
    </>
  )
}

export default Minesweeper;
