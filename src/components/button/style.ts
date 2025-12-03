import styled from 'styled-components';

export const Button = styled.button<{ type: string }>`
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.primary};
  font-family: Paperlogy;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  ${props =>
    props.type === 'pink' &&
    `background: ${props.theme.colors.secondary};`}

  ${props =>
    props.type === 'white' &&
    `background: ${props.theme.colors.white};`}
`;
