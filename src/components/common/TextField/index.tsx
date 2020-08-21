import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

const TextField: React.FC<ITextFieldProps> = ({
    type,
    id,
    className,
    label,
    ...attrs
}) => (
    <div>
        {label
        && <label htmlFor={id}>{label}</label>}

        <input
            type={type}
            name={id}
            id={id}
            className={cn(className, styles.input_reset)}
            {...attrs}
        />
    </div>
);

interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    className: string,
    label: string,
};

export default TextField;
