import React from 'react';
import * as _ from './style';
import { WAVEFORM_PATH, WAVEFORM_STROKE_COLOR, WAVEFORM_STROKE_WIDTH } from './data';

interface HeartRateWaveformProps {
  isActive: boolean;
  showScanLine?: boolean;
}

const HeartRateWaveform: React.FC<HeartRateWaveformProps> = ({ isActive, showScanLine = true }) => {
  return (
    <_.WaveformContainer>
      <_.WaveformSvgWrapper $isActive={isActive}>
        <svg viewBox="0 0 2000 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="20%" stopColor="white" stopOpacity="0.3" />
              <stop offset="80%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
            <mask id="fadeMask">
              <rect x="0" y="0" width="2000" height="150" fill="url(#fadeGradient)" />
            </mask>
          </defs>
          <g mask="url(#fadeMask)">
            <path
              d={WAVEFORM_PATH}
              fill="none"
              stroke={WAVEFORM_STROKE_COLOR}
              strokeWidth={WAVEFORM_STROKE_WIDTH}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </_.WaveformSvgWrapper>
      {isActive && showScanLine && <_.ScanLine />}
    </_.WaveformContainer>
  );
};

export default HeartRateWaveform;
