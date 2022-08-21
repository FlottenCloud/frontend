import * as Style from "./style";
import { COLOR, FONT } from "constants/common/theme";
import { useRouter } from "next/router";
import { DefaultAxiosService } from "types/defaultAxiosService";
import Flex from "components/common/Flex";
import { useCallback } from "react";
import FigureImage from "components/common/FigureImage";
import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { MENU } from "constants/common/menu";

const Header = () => {
  const router = useRouter();

  return (
    <Style.Header>
      <Typography>
        {MENU.find((item) => router.pathname.includes(item.url))?.title}
      </Typography>
      <Flex row align="center" gap={10}>
        <Typography>{"userEmail"}</Typography>
        <Button
          onClick={() => {}}
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
