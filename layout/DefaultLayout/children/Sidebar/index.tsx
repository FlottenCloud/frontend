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
  }, []);

  return (
    <Style.Sidebar>
      <Flex
        padding={[0, 10, 20, 10]}
        justify="center"
        style={{ width: "100%" }}
      >
        <Typography
          variant="h4"
          style={{ color: COLOR.WHITE, textAlign: "center" }}
        >{`뜬구름`}</Typography>
      </Flex>
      <Flex gap={16} style={{ width: "100%" }}>
        {MENU.map((item) => {
          return (
            <SideBarItem
              key={item.id}
              menu={item}
              title={item.title}
              icon={item.icon}
              activeIcon={item.activeIcon}
              isSelected={router.pathname.includes(item.url)}
            />
          );
        })}
      </Flex>
    </Style.Sidebar>
  );
};

export default SideBar;
