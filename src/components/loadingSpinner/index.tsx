import React from 'react';
import * as _ from './style';

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 60,
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <_.FullScreenContainer>
        <_.Spinner size={size} />
      </_.FullScreenContainer>
    );
  }

  return <_.Spinner size={size} />;
};

export default LoadingSpinner;
