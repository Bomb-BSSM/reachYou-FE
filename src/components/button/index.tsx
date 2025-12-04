import React from 'react';
import * as _ from './style';

interface ButtonProps {
  body: string;
  type?: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ body, type = '', onClick }) => {
  return (
    <_.Button type={type} onClick={onClick}>
      {body}
    </_.Button>
  );
};
export default Button;
