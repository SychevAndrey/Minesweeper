import React from 'react'
import cn from 'classnames';

import styles from './index.module.scss';

export default function Navbar() {
  return (
    <nav>
      <div className="nav-wrapper blue darken-1">
        <a href="/" className={cn("brand-logo", styles.logo)}>
          <i className="material-icons">location_searching</i>
          Сапёр
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="game">Играть</a></li>
          <li><a href="stats">Статистика</a></li>
          <li><a href="info">Информация</a></li>
        </ul>
      </div>
    </nav>
  )
}
