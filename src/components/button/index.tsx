import React from 'react';
import * as _ from './style';

interface ButtonProps {
  body: string;
  type?: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({ body, type = '', onClick, disabled = false }) => {
  return (
    <_.Button type={type} onClick={onClick} disabled={disabled}>
      {body}
    </_.Button>
  );
};
export default Button;
