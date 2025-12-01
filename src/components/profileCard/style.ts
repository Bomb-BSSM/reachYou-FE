import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
  align-items: flex-start;
  justify-content: center;
`;

export const ProfileImage = styled.div`
  width: 75px;
  height: 75px;
  border-radius: 50px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.g400};
  position: relative;
`;

export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const AvatarHead = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  left: 24px;
  top: 15px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`;

export const AvatarBody = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  left: 50%;
  top: 45px;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
`;

export const InfoSection = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const Name = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
`;

export const Mbti = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
