import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

const Button: React.FC<ButtonProps> = ({
	children = 'button',
	className = '',
	type = 'button',
	mode = 'light',
	href = null,
	onClick,
	disabled = false,
	...attrs
}) => {
	let Tag: any = 'button';
	if (href) Tag = 'a';

	const onBtnClick = (event: React.MouseEvent) => {
		if (disabled) {
			event.preventDefault();
		} else {
			onClick(event);
		}
	};

	let btnClasses = styles.btn;
	if (mode === 'dark') {
		btnClasses = cn(btnClasses, styles.btn__dark);
	}

	return (
		<Tag
			type={type}
			className={cn(btnClasses, className)}
			onClick={onBtnClick}
			disabled={disabled}
			{...attrs}
		>
			{children}
		</Tag>
	);
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    mode?: string,
    href?: string | null,
    onClick: (event: React.MouseEvent) => void,
    disabled?: boolean,
};

export default Button;
