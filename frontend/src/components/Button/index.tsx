import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import { Conteiner } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = ({ children, ...rest }) => (
  <Conteiner {...rest}>{children}</Conteiner>
);

export default Button;
