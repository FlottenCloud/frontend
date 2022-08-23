import * as Style from "./style";
import { COLOR, FONT } from "constants/common/theme";
import FigureImage from "components/common/FigureImage";
import { useCallback, useState } from "react";
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
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();
  const targetUrl = menu.url;
  const targetQuery = menu.query;

  const font = isSelected ? FONT.B4 : FONT.R4;
  const textColor = isSelected
    ? hover
      ? COLOR.WHITE
      : COLOR.BLACK
    : COLOR.WHITE;
  const src = isSelected ? activeIcon : icon;

  const handleClick = useCallback(() => {
    router.push({ pathname: targetUrl, query: { ...targetQuery } });
  }, [router, targetUrl, targetQuery]);

  return (
    <Style.SideBarItem
      isSelected={isSelected}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      {/* <FigureImage width={22} height={22} src={src} alt={title} /> */}
      <Typography
        variant="subtitle1"
        style={{
          textAlign: "center",
          color: textColor,
          transition: "color 0.3s ease-in-out",
        }}
      >
        {title}
      </Typography>
    </Style.SideBarItem>
  );
};

export default SideBarItem;
