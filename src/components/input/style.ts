import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 14px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: transparent;

  color: ${({ theme }) => theme.colors.black};
  font-family: 'HS산토끼체 2.0', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: ${({ theme }) => theme.colors.g500};
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
