import styled from 'styled-components';

export const SelectWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
`;

export const Select = styled.select<{ value?: string }>`
  width: 100%;
  height: 44px;
  padding: 12px;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  background: transparent;

  color: ${({ value, theme }) =>
    value ? theme.colors.black : theme.colors.g500};
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23F97A9F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 36px;
  cursor: pointer;

  option {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
  }

  option:disabled {
    color: ${({ theme }) => theme.colors.g500};
    font-weight: 500;
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
