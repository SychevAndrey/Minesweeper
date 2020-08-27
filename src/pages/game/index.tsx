import React, { useState, useEffect, useCallback } from 'react'
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
  const { size, changeSize } = useGameContext();
  const [data, setData] = useState<number[]>([]);
  const getInitState = useCallback((hardReset: boolean) => {
    const localState = localStorage.getItem('state')?.split(' ').map(item => parseInt(item));
    return localState && !hardReset ? localState : new Array(size * size).fill(CellState.hide);
  }, [size]);
  const [state, setState] = useState<CellState[]>(getInitState(false));
  const [begin, setBegin] = useState<boolean>(true);
  
  // const [finish, setFinish] = useState<[boolean, boolean]>([false, false]); // запилить через контекст, туда же время


  function checkTurn(cellId: number, buttons: number): void {
    switch (buttons) {
      case 1:
        setState((prevState) => {
          let flag: boolean = false;
          function openEmptyCells(cellId: number, newState: number[], flag: boolean): void {
            if (cellId < 0 || cellId > size * size) return;
            if (newState[cellId] === CellState.show) return;
            if (data[cellId] !== 0) {
              newState[cellId] = CellState.show;
              flag = true;
            }
            if (!flag) {
              newState[cellId] = CellState.show;
              openEmptyCells(cellId - size, newState, flag);
              openEmptyCells(cellId + size, newState, flag);
              if (cellId % size !== 0) {
                openEmptyCells(cellId - 1, newState, flag);
                openEmptyCells(cellId - size - 1, newState, flag);
                openEmptyCells(cellId + size - 1, newState, flag);
              }
              if (cellId % (Math.floor(cellId / size + 1) * (size) - 1) !== 0) {
                openEmptyCells(cellId + 1, newState, flag);
                openEmptyCells(cellId + size + 1, newState, flag);
                openEmptyCells(cellId - size + 1, newState, flag);
              }
            }
          }

          let newState = [...prevState];
          if (newState[cellId] === CellState.show) return prevState;
          openEmptyCells(cellId, newState, flag);
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
    const localDataState: number[] | undefined = localStorage.getItem('field')?.split(' ').map(item => parseInt(item));
    console.log(localDataState);
    if (localDataState === undefined || localDataState.length !== size * size) {
      setState(getInitState(true))
      setData(() => {
        const newData = generateField(size, Difficulty.hard)
        localStorage.setItem('field', newData.join(' '));
        console.log(newData);
        return newData;
      });
    } else  {
      setData(localStorage.getItem('field')!.split(' ').map(item => parseInt(item)));
    } 
  }, [size, getInitState])

  useEffect(() => {
    localStorage.setItem('state', state.join(' '))
  }, [state])


  const cells = (): JSX.Element[] => {
    return data.map((cell, index) => <Cell value={cell} key={index} index={index} onTurn={checkTurn} show={state[index]} />)
  }

  return (
    <>
    <div style={{display:'flex', alignItems: 'center'}}>
        <span style={{width: '200px'}}>Размер поля:</span>
        <input style={{ width: '40px', marginRight: '50px'}} type='number' value={size} onChange={(e) => {
        if (changeSize !== undefined) {
          changeSize(Number(e.target.value));
        }}}></input>
        <span style={{ width: '200px' }}>Сложность:</span>
        <option></option>
    </div>
    <div style={{width: `${size*30}px`}} className={styles.field}>
      { cells() }
    </div>
    <Button color='danger' onClick={() => {
      setState(getInitState(true))
      localStorage.setItem('field', '');
      setData(() => {
        const newData = generateField(size, Difficulty.hard)
        localStorage.setItem('field', newData.join(' '));
        return newData;
      })
      }}>Начать заново</Button>
    </>
  )
}

export default Minesweeper;
