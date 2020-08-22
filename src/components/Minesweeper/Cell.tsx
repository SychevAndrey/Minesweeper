import React, { useState } from 'react'

import styles from './index.module.scss'

interface ICellProps {
  value: number
}

const Cell: React.FC<ICellProps> = ({value}) => {

  const [state, setState] = useState(false);
  function mouseClickHandler(event: React.MouseEvent): void {

    if (event) {
      console.log(event)
    }
    setState(true);
  }

  return (
    <span onClick={(event) => mouseClickHandler(event)} className={styles.cell}>
      {state ? value === 9 ? <span>B</span> : value : ''}
    </span>
  )
}

export default Cell;
