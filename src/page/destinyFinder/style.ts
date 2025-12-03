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
  padding-top: 128px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: 750px;
  align-items: flex-start;
`;

export const HeaderArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTextArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const HeaderText = styled.h3<{ color: string }>`
  color: ${props =>
    props.color === 'pink'
      ? props.theme.colors.primary
      : props.theme.colors.black};
  font-family: ${props =>
    props.color === 'pink' ? "'S-Core Dream'" : "'S-Core Dream'"};
  font-size: 18px;
  font-style: normal;
  font-weight: ${props => (props.color === 'pink' ? '700' : '500')};
  line-height: normal;
  white-space: pre-wrap;
`;

export const MainContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`;

export const AddProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
`;

export const ProfileHeadText = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-start;
  font-family: 'Paperlogy', sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: pre-wrap;
`;

export const ProfileHeadTitle = styled.p`
  color: ${({ theme }) => theme.colors.black};
`;

export const ProfileCount = styled.p`
  color: ${({ theme }) => theme.colors.primary500};
`;

export const AddProfileImageButton = styled.button`
  width: 60px;
  height: 60px;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(0.9);
    border: none;
    outline: none;
  }
`;

export const InputArea = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const ProfileCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  height: 460px;
`;
