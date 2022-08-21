import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import * as Style from "./style";

export interface FlexProps {
  row?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
  margin?: Array<number>;
  padding?: Array<number>;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end" | "space-between" | "space-around";
}

const Flex = (
  props: FlexProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const {
    width,
    height,
    borderRadius,
    margin = [0, 0, 0, 0],
    padding = [0, 0, 0, 0],
    row = false,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
  } = props;
  const WrapperStyle = {
    display: "flex",

    width: width ? `${width / 10}rem` : "auto",
    height: height ? `${height / 10}rem` : "auto",

    borderRadius: `${borderRadius / 10}rem`,

    marginTop: `${margin[0] / 10}rem`,
    marginRight: `${margin[1] / 10}rem`,
    marginBottom: `${margin[2] / 10}rem`,
    marginLeft: `${margin[3] / 10}rem`,
    paddingTop: `${padding[0] / 10}rem`,
    paddingRight: `${padding[1] / 10}rem`,
    paddingBottom: `${padding[2] / 10}rem`,
    paddingLeft: `${padding[3] / 10}rem`,

    alignItems: align,
    justifyContent: justify,

    rowGap: `${(rowGap ?? gap) / 10}rem`,
    columnGap: `${(columnGap ?? gap) / 10}rem`,

    ...props.style,
  };

  return (
    <Style.FlexWrapper
      {...props}
      style={{ ...WrapperStyle, flexDirection: row ? "row" : "column" }}
    />
  );
};

export default Flex;
