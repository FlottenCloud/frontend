import * as Style from "./style";
import { COLOR, FONT } from "constants/common/theme";
import FigureImage from "components/common/FigureImage";
import { useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Typography } from "@mui/material";

interface SideBarProps {
  menu: any;
  title: string;
  icon: string;
  activeIcon: string;
  isSelected: boolean;
}

const SideBarItem = ({
  menu,
  title,
  icon,
  activeIcon,
  isSelected,
}: SideBarProps) => {
  const router = useRouter();
  const targetUrl = menu.url;
  const targetQuery = menu.query;

  const font = isSelected ? FONT.B4 : FONT.R4;
  const textColor = isSelected ? COLOR.BLACK : COLOR.WHITE;
  const src = isSelected ? activeIcon : icon;

  const handleClick = useCallback(() => {
    router.push({ pathname: targetUrl, query: { ...targetQuery } });
  }, [router, targetUrl, targetQuery]);

  return (
    <Style.SideBarItem isSelected={isSelected} onClick={handleClick}>
      {/* <FigureImage width={22} height={22} src={src} alt={title} /> */}
      <Typography
        variant="h5"
        style={{ textAlign: "center", color: textColor }}
      >
        {title}
      </Typography>
    </Style.SideBarItem>
  );
};

export default SideBarItem;
