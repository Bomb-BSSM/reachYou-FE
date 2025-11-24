import styled from 'styled-components';

export const Button = styled.button`
  display: inline-flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: #fff;

  color: ${({ theme }) => theme.colors.primary};
  font-family: Paperlogy;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
