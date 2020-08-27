import React, { useState, useContext } from 'react'

interface IGameContext {
  size: number,
  changeSize?: (size: number) => void,
}

const GameContext = React.createContext<IGameContext>({size: 9});

export const useGameContext = () => {
  return useContext(GameContext);
}

export const GameProvider = ({children} : any): JSX.Element => {
  const [size, setSize] = useState(9);
  const changeSize = (size: number) => {
    setSize(size)
  };

  return (
		<GameContext.Provider
			value={{
				size,
				changeSize
			}}
		>
			{children}
		</GameContext.Provider>
	);
}