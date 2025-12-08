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

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 102px;
`;

export const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 160px;
`;

export const ProfileImageWrapper = styled.div`
  width: 160px;
  height: 160px;
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
  gap: 20px;
  align-items: center;
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
`;

export const ProfileName = styled.p`
  margin: 0;
`;

export const ProfileMBTI = styled.p`
  margin: 0;
`;

export const CompatibilityScore = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

export const AnalysisSection = styled.div`
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

export const AnalysisBox = styled.div`
  background: #fffefa;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AnalysisText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  line-height: normal;
  letter-spacing: 0.56px;
  margin: 0;
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const OtherCompatibilitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const OtherCompatibilityText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  line-height: 22px;
  letter-spacing: 0.56px;
  margin: 0;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 10;
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
