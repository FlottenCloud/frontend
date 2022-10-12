import { useRouter } from "next/router";
import SideBarItem from "./SideBarItem";
import * as Style from "./style";
import Flex from "components/common/Flex";
import { MENU } from "constants/common/menu";
import { useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { COLOR } from "constants/common/theme";
import CloudIcon from "@mui/icons-material/CloudCircle";
import Profile from "components/profile";

const SideBar = () => {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const handleLogoClick = useCallback(() => {
    router.push({ pathname: "/" });
  }, [router]);

  return (
    <Style.Sidebar>
      <Flex
        padding={[0, 10, 20, 10]}
        align="center"
        style={{ width: "100%", gap: "8px" }}
      >
        <CloudIcon
          viewBox="0 0 24 24"
          style={{ color: "white" }}
          sx={{
            width: "36px",
            height: "36px",
          }}
        />
        <Typography
          variant="h5"
          onClick={handleLogoClick}
          style={{ color: COLOR.WHITE, textAlign: "center", cursor: "pointer" }}
        >{`뜬구름`}</Typography>
      </Flex>
      <Flex style={{ width: "100%", height: "100%" }}>
        {MENU.map((item, index) => {
          return (
            <SideBarItem
              key={item.id}
              menu={item}
              title={item.title}
              isSelected={getIndex(router) === index}
              profileOpen={setProfileOpen}
            />
          );
        })}
      </Flex>
      {profileOpen && (
        <Profile
          close={() => {
            setProfileOpen(false);
          }}
        />
      )}
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
