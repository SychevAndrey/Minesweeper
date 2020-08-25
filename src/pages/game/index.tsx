import React, { useState, useEffect } from 'react'
import Cell from './Cell'
import Button from '../../components/common/Button'
import generateField from './map-generator'

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
  const [data, setData] = useState<number[]>([]);
  const [size, setSize] = useState<number>(8);
  const [state, setState] = useState<CellState[]>(getInitialState(false));
  
  // const [finish, setFinish] = useState<[boolean, boolean]>([false, false]); // запилить через контекст, туда же время

  function checkTurn(cellId: number, buttons: number): void {
    switch (buttons) {
      case 1:
        setState((prevState) => {
          let newState = [...prevState];
          if (newState[cellId] === CellState.show) return prevState;
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
    console.log('useEffect')
    if (localStorage.getItem('field') === ''
      || localStorage.getItem('field') === null) {
      setData(() => {
        const newData = generateField(size, Difficulty.hard)
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
    console.log('useEffect1')
    if (localStorage.getItem('field') === ''
      || localStorage.getItem('field') === null) {
      console.log(data);
      setData(() => {
        const newData = generateField(size, Difficulty.hard)
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
    console.log(localState);
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
