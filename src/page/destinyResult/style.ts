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
  overflow-y: auto;
  overflow-x: hidden;
`;

export const HeartBackground = styled.div<{ src: string }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 680px;
  height: 500px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
`;

export const ContentWrapper = styled.div`
  position: relative;
  margin: 128px auto 80px auto;
  width: 750px;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const MainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderPink = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  white-space: pre-wrap;
`;

export const HeaderTitle = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  white-space: pre-wrap;
`;

export const CurrentUserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 32px;
  background: #fffefa;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
`;

export const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.g400};
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  font-family: 'Paperlogy', sans-serif;
`;

export const ProfileName = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const ProfileMBTI = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g600};
  margin: 0;
`;

export const UserStats = styled.div`
  display: flex;
  gap: 24px;
  font-family: 'Paperlogy', sans-serif;
`;

export const StatItem = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const MatchesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const SectionTitle = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const MatchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

export const MatchCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const MatchImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.g400};
`;

export const MatchImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MatchInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: 'Paperlogy', sans-serif;
`;

export const MatchName = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const MatchMBTI = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g600};
  margin: 0;
`;

export const ScoreSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const CompatibilityScore = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const DetailScores = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  font-family: 'Paperlogy', sans-serif;
`;

export const DetailScore = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g600};
  margin: 0;
  text-align: center;
`;

export const LoadingText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

export const ErrorText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
`;
