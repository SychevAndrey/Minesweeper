import React, { useState, useEffect } from 'react'
import Cell from './Cell'
import Button from '../../components/common/Button'
import generateField from './map-generator'

import styles from './index.module.scss'
import { useGameContext } from './GameContext'

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
  const [data, setData] = useState<number[]>([]);
  const [state, setState] = useState<CellState[]>(getInitialState(false));
  let { size } = useGameContext();
  
  // const [finish, setFinish] = useState<[boolean, boolean]>([false, false]); // запилить через контекст, туда же время


  function checkTurn(cellId: number, buttons: number): void {
    switch (buttons) {
      case 1:
        setState((prevState) => {
          function openEmptyCells(cellId: number, newState: number[]): void {
            if (cellId < 0 || cellId > size * size) return;
            if (newState[cellId] === CellState.show) return;
            if (data[cellId] === 0) {
              newState[cellId] = CellState.show;
              openEmptyCells(cellId - 1, newState);
              openEmptyCells(cellId - 1, newState);
              openEmptyCells(cellId - size, newState);
              openEmptyCells(cellId - size + 1, newState);
              openEmptyCells(cellId - size - 1, newState);
              openEmptyCells(cellId + size, newState);
              openEmptyCells(cellId + size - 1, newState);
              openEmptyCells(cellId + size + 1, newState);
            }
          }

          let newState = [...prevState];
          if (newState[cellId] === CellState.show) return prevState;
          openEmptyCells(cellId, newState);
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
    if (localStorage.getItem('field') === ''
      || localStorage.getItem('field') === null) {
      setData(() => {
        const newData = generateField(size, Difficulty.easy)
        localStorage.setItem('field', newData.join(' '));
        return newData;
      });
    } else  {
      setData(localStorage.getItem('field')!.split(' ').map(item => parseInt(item)));
    }
  }, [size])

  useEffect(() => {
    localStorage.setItem('state', state.join(' '))
  }, [state])

  useEffect(() =>{
    if (localStorage.getItem('field') === ''
      || localStorage.getItem('field') === null) {
      setData(() => {
        const newData = generateField(size, Difficulty.easy)
        localStorage.setItem('field', newData.join(' '));
        return newData;
      });
    }
  }, [data, size])

  const cells = (): JSX.Element[] => {
    return data.map((cell, index) => <Cell value={cell} key={index} index={index} onTurn={checkTurn} show={state[index]} />)
  }

  function getInitialState(hardReset : boolean): Array<CellState> {
    const localState = localStorage.getItem('state')?.split(' ').map(item => parseInt(item));
    return localState && !hardReset ? localState : new Array(size*size).fill(CellState.hide);
  }

  return (
    <>
    <div style={{width: `${size*30}px`}} className={styles.field}>
      { cells() }
    </div>
    <Button color='danger' onClick={() => {
      setState(getInitialState(true))
      localStorage.setItem('field', '');
      setData([]);
      }}>Начать заново</Button>
    </>
  )
}

export default Minesweeper;
