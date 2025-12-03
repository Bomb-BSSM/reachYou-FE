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

export const DefaultProfile = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.g400};
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
  color: ${({ theme }) => theme.colors.black};
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

export const ConfessButton = styled.div`
  width: 556px;
  margin: 0 auto;

  button {
    width: 100%;
    padding: 14px 20px;
    font-size: 18px;
    border-width: 2px;
  }
`;
