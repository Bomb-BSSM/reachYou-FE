import styled, { keyframes } from 'styled-components';

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

export const MeasurementCard = styled.div`
  width: 100%;
  max-width: 650px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h4`
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
`;

export const TemperatureInfo = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${props => props.$isActive ? pulse : 'none'} 1.5s ease-in-out infinite;
`;

export const TemperatureLabel = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g500};
`;

export const TemperatureValue = styled.span`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MeasurementInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const HeartRateLabel = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g500};
`;

export const HeartRateValue = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin: 0;
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
