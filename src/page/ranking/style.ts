import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(255, 208, 226, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
`;

export const Header = styled.div`
  position: absolute;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  width: 842px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
`;

export const RankingList = styled.div`
  position: absolute;
  left: 50%;
  top: 140px;
  transform: translateX(-50%);
  width: 842px;
  display: flex;
  flex-direction: column;
  gap: 19px;
`;
