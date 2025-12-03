import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
  align-items: flex-start;
  justify-content: center;
`;

export const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.g400};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
  }
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
  gap: 12px;
  align-items: center;
  width: 100%;
`;

export const Name = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
`;

export const Mbti = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
`;

export const EditInput = styled.input`
  width: auto;
  min-width: 50px;
  max-width: 90px;
  padding: 0;
  border: none;
  border-bottom: 1px solid transparent;
  background: transparent;

  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.g400};
    font-weight: 400;
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
