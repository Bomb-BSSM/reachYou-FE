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
  gap: 16px;
`;

export const HeaderTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MeasureStatus = styled.div`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
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

export const ProfileCardGrid = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  width: 750px;
  height: 460px;
`;
