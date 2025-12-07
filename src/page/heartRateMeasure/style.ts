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
  padding-top: 128px;
`;

export const MainHeader = styled.div`
  position: absolute;
  top: 128px;
  left: calc(16.67% + 83px);
  width: 750px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderText = styled.h3<{ color: string }>`
  color: ${props =>
    props.color === 'pink' ? props.theme.colors.primary : props.theme.colors.black};
  font-family: 'S-Core Dream', sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: ${props => (props.color === 'pink' ? '700' : '500')};
  line-height: normal;
  white-space: pre-wrap;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  width: 650px;
`;

export const StartButton = styled.div`
  width: 280px;
  margin-top: 8px;

  button {
    width: 100%;
    padding: 10px 16px;
    font-size: 16px;
    border-width: 2px;
  }
`;

export const ResultCardsGrid = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 650px));
  gap: 32px;
  width: 90%;
  max-width: 1400px;
  padding: 0 16px;
  margin-top: 32px;
  justify-content: center;
`;
