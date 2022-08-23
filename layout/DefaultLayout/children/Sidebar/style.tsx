import styled from "@emotion/styled";
import { COLOR } from "constants/common/theme";

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 250px;
  background-color: #121828;
  padding: 20px;
`;

interface SideBarItemProps {
  isSelected: boolean;
}

export const SideBarItem = styled.div<SideBarItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  background-color: ${({ isSelected }) =>
    isSelected ? COLOR.WHITE : COLOR.SIDEBAR};
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  &:hover {
    cursor: pointer;
    background-position: 0;
  }
  background-image: linear-gradient(
    45deg,
    ${COLOR.KEY_COLOR} 50%,
    transparent 50%
  );
  background-position: 100%;
  background-size: 400%;
  transition: background 0.3s ease-in-out;
`;
