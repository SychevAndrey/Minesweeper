import React from 'react'
import cn from 'classnames';

import styles from './index.module.scss';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
		<nav>
			<div className='nav-wrapper blue darken-1'>
				<a href='/' className={cn('brand-logo', styles.logo)}>
					<i className='material-icons'>location_searching</i>
					Сапёр
				</a>
				<ul id='nav-mobile' className='right hide-on-med-and-down'>
					<li>
						<NavLink to='/'>Играть</NavLink>
					</li>
					<li>
						<NavLink to='/stats'>Статистика</NavLink>
					</li>
					<li>
						<NavLink to='/info'>Информация</NavLink>
					</li>
				</ul>
			</div>
		</nav>
	);
}
