import React from 'react'

import styles from './index.module.scss'

interface ICellProps {
  value: string | number
}

const Cell: React.FC<ICellProps> = ({value}) => {
  return (
    <span className={styles.cell}>
      {value}
    </span>
  )
}

export default Cell;
