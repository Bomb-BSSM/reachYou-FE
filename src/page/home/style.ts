import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;
`;
export const LogoImg = styled.img`
  height: 187px;
`;
export const ButtonArea = styled.div`
  display: flex;
  width: 560px;
  flex-direction: column;
  gap: 12px;
`;
export const Button = styled.button`
  display: inline-flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.primary};
  font-family: Paperlogy;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
  &:active {
    outline: none;
  }
`;
