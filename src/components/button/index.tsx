import React from 'react';
import * as _ from './style';

interface ButtonProps {
  body: string;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ body, onClick }) => {
  return <_.Button onClick={onClick}>{body}</_.Button>;
};
export default Button;
