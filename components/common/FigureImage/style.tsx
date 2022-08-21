import styled from "@emotion/styled";

interface FigureImageProps {
  width: number;
  height: number;
  borderRadius: number;
  backgroundColor: string;
  hover: boolean;
}

export const FigureImage = styled.figure<FigureImageProps>`
  width: ${({ width }) => `${width / 10}rem`};
  height: ${({ height }) => (height ? `${height / 10}rem` : "auto")};
  border-radius: ${({ borderRadius }) => `${borderRadius}px`};
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: ${({ hover }) => hover && "pointer"};
`;
