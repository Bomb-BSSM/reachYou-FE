import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContentWrapper = styled.div`
  position: relative;
  margin: 128px auto 80px auto;
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
  display: flex;
  flex-direction: column;
  gap: 19px;
  width: 100%;
`;

export const RankingCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 24px 32px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.g400};
  border-radius: 12px;
  box-sizing: border-box;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const Rank = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
  text-align: right;
`;

export const CoupleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PersonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ProfileImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.g400};
`;

export const PersonName = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: nowrap;
  text-align: right;
`;

export const HeartIcon = styled.img`
  width: 24px;
  height: 24px;
`;

export const CoupleName = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: normal;
  color: #5f5c67;
  margin: 0;
  white-space: nowrap;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const ScoreBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 30px;
`;

export const ScoreLabel = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.g400};
  margin: 0;
  white-space: nowrap;
`;

export const Score = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
  text-align: right;
`;

export const StarRating = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 18px;
  width: 106px;
`;

export const Star = styled.span<{ filled: boolean }>`
  font-size: 18px;
  color: ${({ filled }) => (filled ? '#FFD700' : '#D9D9D9')};
  line-height: 1;
`;
