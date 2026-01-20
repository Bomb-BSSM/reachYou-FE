import styled from 'styled-components';

export const CaptureButtonWrapper = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.primary};
  font-family: Paperlogy;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
