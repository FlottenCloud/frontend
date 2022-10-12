import * as Style from "./style";
import { COLOR, FONT } from "constants/common/theme";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import useError from "hooks/api/common/useError";
import Flex from "components/common/Flex";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InstanceIcon from "@mui/icons-material/Cloud";
import ConsoleIcon from "@mui/icons-material/Computer";
import ProfileIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import Profile from "components/profile";

const Icons = [
  <DashboardIcon key={0} style={{ color: "white" }} />,
  <InstanceIcon key={1} style={{ color: "white" }} />,
  <ConsoleIcon key={2} style={{ color: "white" }} />,
  <ProfileIcon key={3} style={{ color: "white" }} />,
  <ErrorIcon key={4} style={{ color: "white" }} />,
] as const;

const IconsBlack = [
  <DashboardIcon key={0} />,
  <InstanceIcon key={1} />,
  <ConsoleIcon key={2} />,
  <ProfileIcon key={3} />,
  <ErrorIcon key={4} />,
] as const;

interface SideBarProps {
  menu: any;
  title: string;
  isSelected: boolean;
  profileOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBarItem = ({
  menu,
  title,
  isSelected,
  profileOpen,
}: SideBarProps) => {
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
    if (targetUrl !== "/error" && targetUrl !== "/profile") {
      router.push({ pathname: targetUrl, query: { ...targetQuery } });
    } else if (targetUrl === "/error") {
      const pk = prompt("에러 발생시킬 인스턴스 pk");
      if (pk) {
        error.mutate({ instance_pk: +pk });
      }
    } else {
      profileOpen(true);
    }
  }, [targetUrl, router, targetQuery, error, profileOpen]);

  return (
    <Style.SideBarItem
      isSelected={isSelected}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{ marginTop: targetUrl === "/error" ? "auto" : "initial" }}
    >
      {/* <FigureImage width={22} height={22} src={src} alt={title} /> */}
      <Flex
        align="center"
        style={{ width: "100%", paddingBlock: "14px", gap: "8px" }}
      >
        {isSelected ? IconsBlack[menu.id] : Icons[menu.id]}
        <Typography
          variant="subtitle2"
          style={{
            textAlign: "center",
            color: textColor,
            transition: "color 0.3s ease-in-out",
          }}
        >
          {title}
        </Typography>
      </Flex>
    </Style.SideBarItem>
  );
};

export default SideBarItem;
