import * as Style from "./style";
import { useRouter } from "next/router";
import Flex from "components/common/Flex";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { MENU } from "constants/common/menu";
import { useCallback } from "react";

const Header = () => {
  const router = useRouter();

  const handleSignoutClick = useCallback(() => {
    localStorage.setItem("token", "");
    router.push("/auth/signin");
  }, [router]);

  return (
    <Style.Header>
      <Typography>
        {MENU.find((item) => router.pathname.includes(item.url))?.title}
      </Typography>
      <Flex row align="center" gap={10}>
        <Typography>{"userEmail"}</Typography>
        <Button
          onClick={handleSignoutClick}
          variant="contained"
          size="small"
          startIcon={
            <Image
              src={"/images/sidebar/logout.png"}
              alt={"logout"}
              width={20}
              height={20}
            />
          }
        >
          {"Sign out"}
        </Button>
      </Flex>
    </Style.Header>
  );
};

export default Header;
