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

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CoupleLabel = styled.p`
  font-family: 'S-Core Dream', sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  white-space: nowrap;
`;

export const CoupleName = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  white-space: nowrap;
`;

export const StarDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 18px;
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
  white-space: nowrap;
`;

export const ProfileMBTI = styled.p`
  margin: 0;
  white-space: nowrap;
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

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const CommentInputBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 12px;
`;

export const CommentInputLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const StarInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 18px;
`;

export const StarInput = styled.span<{ filled: boolean }>`
  font-size: 18px;
  color: ${({ filled }) => (filled ? '#FFD700' : '#D9D9D9')};
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const CommentInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
  line-height: normal;
  letter-spacing: 0.56px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.g500};
  }
`;

export const SendButton = styled.button<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: ${({ disabled, theme }) =>
    disabled ? theme.colors.g400 : theme.colors.primary};
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const SendButtonImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const CommentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.g500};
  border-radius: 12px;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CommentStars = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  height: 18px;
`;

export const CommentNickname = styled.span`
  font-family: 'Paperlogy', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.g400};
  white-space: nowrap;
`;

export const Star = styled.span<{ filled: boolean }>`
  font-size: 18px;
  color: ${({ filled }) => (filled ? '#FFD700' : '#D9D9D9')};
  line-height: 1;
`;

export const CommentText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: normal;
  letter-spacing: 0.56px;
  margin: 0;
  white-space: pre-wrap;
`;

export const CommentContent = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  letter-spacing: 0.56px;
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CommentTime = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 10px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.g500};
  line-height: normal;
  letter-spacing: 0.4px;
  margin: 0;
  white-space: nowrap;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 100px;
`;

export const LoadingText = styled.p`
  font-family: 'Paperlogy', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;
