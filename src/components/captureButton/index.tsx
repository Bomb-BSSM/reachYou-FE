import React from 'react';
import * as _ from './style';

interface CaptureButtonProps {
  onClick: () => void;
  isCapturing?: boolean;
}

const CaptureButton: React.FC<CaptureButtonProps> = ({
  onClick,
  isCapturing = false,
}) => {
  return (
    <_.CaptureButtonWrapper
      onClick={onClick}
      disabled={isCapturing}
      data-capture-ignore="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
      >
        <path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="13"
          r="4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {isCapturing ? '저장 중...' : '결과 저장'}
    </_.CaptureButtonWrapper>
  );
};

export default CaptureButton;
