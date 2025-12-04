import styled, { keyframes } from 'styled-components';

export const WaveformContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;

const waveformScroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

export const WaveformSvgWrapper = styled.div<{ $isActive: boolean }>`
  position: absolute;
  width: 200%;
  height: 100%;
  left: 0;
  animation: ${props => props.$isActive ? waveformScroll : 'none'} 4s linear infinite;

  svg {
    width: 100%;
    height: 100%;

    path {
      filter: drop-shadow(0 0 3px rgba(249, 122, 159, 0.4));
    }
  }
`;

const scanLinePulse = keyframes`
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
`;

export const ScanLine = styled.div`
  position: absolute;
  right: 10%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(249, 122, 159, 0.8) 20%,
    rgba(249, 122, 159, 1) 50%,
    rgba(249, 122, 159, 0.8) 80%,
    transparent
  );
  box-shadow: 0 0 8px rgba(249, 122, 159, 0.8);
  animation: ${scanLinePulse} 1s ease-in-out infinite;
  z-index: 10;
`;
