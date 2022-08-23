import styled from "@emotion/styled";

interface DisableBackgroundProps {
  isHover: boolean;
  zIndex: number;
}

export const DisableBackground = styled.div<DisableBackgroundProps>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ zIndex }) => zIndex};
  &:hover {
    cursor: ${({ isHover }) => (isHover ? "pointer" : "initial")};
  }
`;
