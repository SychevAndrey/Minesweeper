import React from 'react';
import Cell from './Cell'

import styles from './index.module.scss'

type Difficulty = 'easy' | 'medium' | 'hard';

interface IMinesweeperProps {
  size: number,
  difficulty: Difficulty
}

const Minesweeper: React.FC<IMinesweeperProps> = ({size, difficulty}) => {

    const cells = (data: Array<Array<number>>): JSX.Element[][] => {
      return data.map((row) => row.map((cell) => <Cell value={cell} key={Math.random()} />))
    }

  const data: Array<Array<number>> = [[0, 0, 1, 9],
  [1, 1, 1, 1],
  [9, 2, 1, 0],
  [2, 9, 1, 0]];

  console.log('render');

  return (
    <div style={{width: `${size*20}px`}} className={styles.field}>
      {cells(data)}
    </div>
  )
}

export default Minesweeper;
