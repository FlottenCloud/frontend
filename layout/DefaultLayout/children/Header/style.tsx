import styled from "@emotion/styled";
import { COLOR } from "constants/common/theme";

export const Header = styled.div`
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-bottom: 2px solid ${COLOR.BORDER};
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;
