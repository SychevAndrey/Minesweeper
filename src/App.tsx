import React from 'react';
import Button from './components/common/Button';
import styles from './App.module.scss';
import Icon from './components/common/Icon';

function App() {
  return (
		<>
			<Button className={styles.btn} onClick={() => console.log(1)}>
				<>
					Press Me
					<Icon name='chevron' inButton='append'></Icon>
				</>
			</Button>
		</>
	);
}

export default App;
