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

export const HeartBackground = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 680px;
  height: 500px;
  opacity: 0.2;
  filter: blur(15px);
  background-image: url("data:image/svg+xml,%3Csvg width='806' height='597' viewBox='0 0 806 597' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M403 596.523C403 596.523 0.5 447.023 0.5 298.523C0.5 150.023 134 0.523438 268.5 149.023C403 298.523 403 298.523 403 298.523C403 298.523 403 298.523 537.5 149.023C672 0.523438 805.5 150.023 805.5 298.523C805.5 447.023 403 596.523 403 596.523Z' fill='%23F97A9F'/%3E%3C/svg%3E");
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
    font-size: 18px;
    border-width: 2px;
  }
`;
