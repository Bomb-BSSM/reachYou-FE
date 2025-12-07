import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const AlertContainer = styled.div`
  display: flex;
  min-width: 324px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background: #fff;
  border-radius: 8px;
`;
export const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
export const TitleText = styled.h2`
  color: #000;
  font-family: Paperlogy;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const ContentText = styled.p`
  color: #5f5c67;
  font-family: Paperlogy;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
`;
