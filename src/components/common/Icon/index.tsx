import React from 'react';
import cn from 'classnames';
import { ReactComponent as IconChevron } from '../../../icons/chevron.svg';

import styles from './index.module.scss';

const iconsTypes: any = {
	chevron: IconChevron,
};

const Icon: React.FC<IIconProps> = ({
    name,
    color,
    className,
    inButton = '',
    ...attrs
}) => {
    const Component: any = iconsTypes[name];
    if (!Component) return null;

    function inBtnPosition(inButton: string): string {
      if (inButton === 'prepend') return styles.prepend;
      if (inButton === 'append') return styles.append;
      return '';
    }

    return (
        <Component
            className={
                cn(
                    styles.icon,
                    inBtnPosition(inButton),
                    className,
                )
            }
            name={name}
            {...attrs}
        />
    );
};

interface IIconProps {
    name: string,
    color?: string,
    inButton?: string,
    className?: string,
};

export default Icon;
