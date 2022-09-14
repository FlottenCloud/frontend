import * as Style from "./style";
import { useRouter } from "next/router";
import Flex from "components/common/Flex";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { MENU } from "constants/common/menu";
import { useCallback, useEffect, useState } from "react";
import { DefaultAxiosService } from "types/defaultAxiosService";
import LogoutButton from "@mui/icons-material/Logout";

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
      <Typography variant="subtitle1">{getTitle(router)}</Typography>
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
  if (
    router.pathname.includes("instance") ||
    router.pathname.includes("cloudstack")
  ) {
    return "INSTANCE";
  }
  if (
    router.pathname.includes("dashboard") ||
    router.pathname.includes("clouddash")
  ) {
    return "DASHBOARD";
  }
  if (router.pathname.includes("profile")) {
    return "PROFILE";
  }
};
