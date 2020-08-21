import React from 'react';
import Button from './components/common/Button';
import styles from './App.module.scss';
import Icon from './components/common/Icon';

function App() {
  return (
		<>
			<Button className={styles.primary} onClick={() => console.log(1)}>
				<>
					Go next
					<Icon name='chevron' inButton='append'></Icon>
				</>
			</Button>
			<Button className={styles.danger} onClick={() => console.log(1)}>
				Danger
			</Button>
			<Button className={styles.success} onClick={() => console.log(1)}>
			  Success
			</Button>
		</>
	);
}

export default App;
