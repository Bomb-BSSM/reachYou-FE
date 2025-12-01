import React from 'react';

const AddProfileIcon: React.FC = () => {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="37.5" cy="37.5" r="37.5" fill="#AAA4AF" />
      <circle cx="37.5" cy="28.5" r="9.5" fill="white" />
      <circle cx="37.5" cy="60.5" r="19.5" fill="white" />
      <circle cx="37.5" cy="37.5" r="36.5" stroke="black" strokeWidth="2" />
      <line
        x1="37.5"
        y1="20"
        x2="37.5"
        y2="55"
        stroke="#F97A9F"
        strokeWidth="3"
      />
      <line
        x1="20"
        y1="37.5"
        x2="55"
        y2="37.5"
        stroke="#F97A9F"
        strokeWidth="3"
      />
    </svg>
  );
};

export default AddProfileIcon;
