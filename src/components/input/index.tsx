import React from 'react';
import * as _ from './style';

interface InputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ placeholder, value, onChange }) => {
  return (
    <_.InputWrapper>
      <_.Input placeholder={placeholder} value={value} onChange={onChange} />
    </_.InputWrapper>
  );
};

export default Input;
