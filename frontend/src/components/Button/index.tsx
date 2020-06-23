import React, { FunctionComponent, ButtonHTMLAttributes } from 'react';

import { Conteiner } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {loading?: boolean};

const Button: FunctionComponent<ButtonProps> = ({ children, loading,...rest }) => (
  <Conteiner type='button' {...rest}>
    {loading ? 'Carregando...' :children}
    </Conteiner>
);

export default Button;
