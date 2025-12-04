import React from 'react';
import * as _ from './style';

interface InputProps {
  placeholder: string;
  value?: string;
  maxlegth?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  maxlegth,
  onChange,
}) => {
  return (
    <_.InputWrapper>
      <_.Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxlegth}
      />
    </_.InputWrapper>
  );
};

export default Input;
