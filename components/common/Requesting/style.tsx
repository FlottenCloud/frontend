import styled from "@emotion/styled";
import { COLOR } from "constants/common/theme";

export const RequestingBar = styled.span`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  &::before {
    position: absolute;
    border: 5px solid ${COLOR.WHITE};
    border-radius: 50%;
    content: "";
    box-sizing: inherit;
    border-top: 5px solid ${COLOR.KEY_COLOR};
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    animation: spin 1s infinite linear;
  }
`;
