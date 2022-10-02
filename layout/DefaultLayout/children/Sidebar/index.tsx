import { useRouter } from "next/router";
import SideBarItem from "./SideBarItem";
import * as Style from "./style";
import Flex from "components/common/Flex";
import { MENU } from "constants/common/menu";
import { useCallback } from "react";
import { Typography } from "@mui/material";
import { COLOR } from "constants/common/theme";

const SideBar = () => {
  const router = useRouter();

  const handleLogoClick = useCallback(() => {
    router.push({ pathname: "/" });
  }, [router]);

  return (
    <Style.Sidebar>
      <Flex
        padding={[0, 10, 20, 10]}
        justify="center"
        style={{ width: "100%" }}
      >
        <Typography
          variant="h4"
          onClick={handleLogoClick}
          style={{ color: COLOR.WHITE, textAlign: "center", cursor: "pointer" }}
        >{`뜬구름`}</Typography>
      </Flex>
      <Flex gap={16} style={{ width: "100%", height: "100%" }}>
        {MENU.map((item, index) => {
          return (
            <SideBarItem
              key={item.id}
              menu={item}
              title={item.title}
              isSelected={getIndex(router) === index}
            />
          );
        })}
      </Flex>
    </Style.Sidebar>
  );
};

export default SideBar;

const getIndex = (router) => {
  if (router.pathname.includes("dashboard")) {
    return 0;
  }
  if (router.pathname.includes("instance")) {
    return 1;
  }
  if (router.pathname.includes("console")) {
    return 2;
  }
  if (router.pathname.includes("profile")) {
    return 3;
  }
};
