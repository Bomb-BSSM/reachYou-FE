import React from 'react';
import * as _ from './style';

interface SelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ placeholder, value, onChange, options }) => {
  return (
    <_.SelectWrapper>
      <_.Select value={value} onChange={onChange}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </_.Select>
    </_.SelectWrapper>
  );
};

export default Select;
