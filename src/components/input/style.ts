import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 12px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: transparent;

  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &::placeholder {
    color: ${({ theme }) => theme.colors.g500};
    font-family: ${({ theme }) => theme.fonts.main};
    font-weight: 500;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
