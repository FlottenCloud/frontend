import * as Style from "./style";
import { useRouter } from "next/router";
import Flex from "components/common/Flex";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { MENU } from "constants/common/menu";
import { useCallback, useEffect, useState } from "react";
import { DefaultAxiosService } from "types/defaultAxiosService";
import LogoutButton from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InstanceIcon from "@mui/icons-material/Cloud";
import ConsoleIcon from "@mui/icons-material/Computer";
import ProfileIcon from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";

const Header = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");

  const handleSignoutClick = useCallback(() => {
    localStorage.setItem("token", "");
    localStorage.setItem("apiKey", "");
    localStorage.setItem("secretKey", "");
    router.push("/auth/signin");
    DefaultAxiosService.removeHeaderToken();
  }, [router]);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <Style.Header>
      <Flex row gap={8} align="center">
        {getIcon(router)}
        <Typography variant="subtitle1">{getTitle(router)}</Typography>
      </Flex>
      <Flex row align="center" gap={10}>
        <Typography variant="subtitle1">{`login user : ${userId}`}</Typography>
        <Button
          onClick={handleSignoutClick}
          variant="contained"
          size="medium"
          startIcon={<LogoutButton />}
        >
          {"Sign out"}
        </Button>
      </Flex>
    </Style.Header>
  );
};

export default Header;

const getTitle = (router) => {
  if (router.pathname.includes("instance")) {
    return "INSTANCE";
  }
  if (router.pathname.includes("dashboard")) {
    return "DASHBOARD";
  }
  if (router.pathname.includes("console")) {
    return "CONSOLE";
  }
  if (router.pathname.includes("profile")) {
    return "PROFILE";
  }
};

const sx = { width: "36px", height: "36px" };

const getIcon = (router) => {
  if (router.pathname.includes("instance")) {
    return <InstanceIcon sx={sx} />;
  }
  if (router.pathname.includes("dashboard")) {
    return <DashboardIcon sx={sx} />;
  }
  if (router.pathname.includes("console")) {
    return <ConsoleIcon sx={sx} />;
  }
  if (router.pathname.includes("profile")) {
    return <ProfileIcon sx={sx} />;
  }
};
