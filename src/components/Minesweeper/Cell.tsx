import React, { useEffect } from 'react'

import styles from './index.module.scss'

interface ICellProps {
  value: number,
  show: CellState,
  index: number,
  onTurn: (cellId: number, buttons: number) => void
}

type CellState = 'show' | 'hide' | 'flag' | 'mark';

const Cell = ({value, show, index, onTurn}: ICellProps) => {
  function showCell():number | JSX.Element {
    switch(show) {
      case 'show':
        return value === 9 ? <i className="tiny material-icons red-text">location_searching</i> : value;
      case 'flag':
        return <i className="tiny material-icons ">flag</i>;
      case 'mark':
        return <i className="tiny material-icons ">help</i>;
      default: return <span></span>;
    }
  }

  console.log('render');

  return (
    <span 
    onContextMenu={(e) => e.preventDefault()} 
    onMouseDown={(event) => onTurn(index, event.buttons)} 
    className={styles.cell}>
      { showCell() }
    </span>
  )
}

export default Cell;
