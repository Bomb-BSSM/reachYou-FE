import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const HeartBackground = styled.div<{ src: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 806px;
  height: 597px;
  opacity: 0.7;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
`;

export const MainHeader = styled.div`
  position: absolute;
  top: 168px;
  left: calc(16.67% + 83px);
  width: 750px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderPink = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  white-space: pre-wrap;
`;

export const HeaderBlack = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
  white-space: pre-wrap;
`;

export const MainContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
`;

export const CardArea = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 200px;
`;

export const NextButton = styled.div`
  width: 380px;

  button {
    width: 100%;
    padding: 12px 18px;
  }
`;
