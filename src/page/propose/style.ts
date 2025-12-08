import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(255, 208, 226, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  overflow: hidden;
`;

export const BackgroundHeart = styled.div<{ src: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 806px;
  height: 600px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 841px;
  z-index: 1;
`;

export const Title = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  margin: 0;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 160px;
`;

export const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
`;

export const ProfileName = styled.p`
  margin: 0;
  white-space: nowrap;
`;

export const ProfileMbti = styled.p`
  margin: 0;
  white-space: nowrap;
`;

export const CompatibilityScore = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 32px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 24px;
  background: #fffefa;
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  box-sizing: border-box;
`;

export const InfoText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.56px;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  width: 100%;
`;

export const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 50px;
  align-items: center;
  justify-content: center;
`;

export const AcceptButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  box-sizing: border-box;

  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    outline: none;
  }
`;

export const RejectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  box-sizing: border-box;

  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    outline: none;
  }
`;
