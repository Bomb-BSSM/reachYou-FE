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
