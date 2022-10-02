import * as Style from "./style";
import { COLOR, FONT } from "constants/common/theme";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import useError from "hooks/api/common/useError";

interface SideBarProps {
  menu: any;
  title: string;
  isSelected: boolean;
}

const SideBarItem = ({ menu, title, isSelected }: SideBarProps) => {
  const [hover, setHover] = useState<boolean>(false);
  const router = useRouter();
  const targetUrl = menu.url;
  const targetQuery = menu.query;
  const error = useError();

  const font = isSelected ? FONT.B4 : FONT.R4;
  const textColor = isSelected
    ? hover
      ? COLOR.WHITE
      : COLOR.BLACK
    : COLOR.WHITE;

  const handleClick = useCallback(() => {
    if (targetUrl !== "/error") {
      router.push({ pathname: targetUrl, query: { ...targetQuery } });
    } else {
      const pk = prompt("에러 발생시킬 인스턴스 pk");
      if (pk) {
        error.mutate({ instance_pk: +pk });
      }
    }
  }, [router, targetUrl, targetQuery, error]);

  return (
    <Style.SideBarItem
      isSelected={isSelected}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{ marginTop: targetUrl === "/error" ? "auto" : "initial" }}
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
