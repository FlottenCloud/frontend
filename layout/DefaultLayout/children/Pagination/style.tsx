import styled from "@emotion/styled";
import { COLOR, FONT } from "constants/common/theme";

export const Pagination = styled.nav`
  width: 100%;
  height: 4.5rem;
  min-height: 4.5rem;
  background-color: ${COLOR.WHITE};
  border-top: 2px solid ${COLOR.BORDER};

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageList = styled.ul`
  display: flex;
  gap: 3rem;
  list-style-type: none;
  align-items: center;
  height: 3.5rem;
`;

export const PageNumber = styled.span`
  ${FONT.R1};
  color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? COLOR.SEOUL_YELLOW : COLOR.BLACK};
`;
