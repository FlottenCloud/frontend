import styled from "@emotion/styled";
import { TableRow } from "@mui/material";

const TableStyledRow = styled(TableRow)`
  @keyframes slide {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }
  animation: slide 0.1s linear;
  z-index: -1;
`;

export default TableStyledRow;
