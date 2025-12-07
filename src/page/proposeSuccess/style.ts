import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const heartBeat = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
  }
`;

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

export const BackgroundHeart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 806px;
  height: 597px;
  background: url("data:image/svg+xml,%3Csvg width='806' height='597' viewBox='0 0 806 597' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M403 597C403 597 0 447 0 268C0 119 89 0 199 0C284 0 352 59 403 149C454 59 522 0 607 0C717 0 806 119 806 268C806 447 403 597 403 597Z' fill='%23FFB6D1'/%3E%3C/svg%3E")
    center/contain no-repeat;
  filter: blur(15px);
  opacity: 0.2;
  animation: ${heartBeat} 3s ease-in-out infinite;
  pointer-events: none;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 100%;
  max-width: 458px;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;
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
  gap: 102px;
`;

export const ProfileCard = styled.div`
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
  font-size: 24px;
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

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  border-radius: 12px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
`;

export const Label = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.g500};
  border-radius: 10px;
  box-sizing: border-box;

  font-family: 'S-Core Dream', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.g500};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  transition: border-color 0.2s ease;
`;

export const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 20px;
  gap: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  box-sizing: border-box;

  font-family: 'Paperlogy', sans-serif;
  font-size: 18px;
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

export const SkipLink = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-underline-position: from-font;
  margin: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;
