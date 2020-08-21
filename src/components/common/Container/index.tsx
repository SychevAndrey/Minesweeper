import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

const Container: React.FC<IContainerProps> = ({ children, className }) => (
    <div className={cn(styles.container, className)}>
        {children}
    </div>
);

interface IContainerProps {
    children: React.ReactChildren,
    className: string,
};

export default Container;
