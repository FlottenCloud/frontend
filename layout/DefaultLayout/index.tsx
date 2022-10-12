import { Typography } from "@mui/material";
import Flex from "components/common/Flex";
import Loading from "components/common/Loading";
import { COLOR } from "constants/common/theme";
import PostModal from "dependency/PostModal";
import { useIsFetching, useIsMutating } from "react-query";
import Header from "./children/Header";
import Pagination from "./children/Pagination";
import Sidebar from "./children/Sidebar";
import * as Style from "./style";

interface DefaultLayoutPorps {
  children: any;
  pages?: number;
}

const DefaultLayout = ({ children, pages }: DefaultLayoutPorps) => {
  const isLoading = useIsFetching() !== 0;

  return (
    <Style.DefaultLayout>
      <Sidebar />
      <Flex style={{ flex: 1, position: "relative" }}>
        {isLoading && <Loading />}
        <PostModal />
        {/* <ChoiceAlert /> */}
        <Header />
        <Flex style={{ padding: "20px", height: "calc(100vh - 120.43px)" }}>
          {children}
        </Flex>
        <Flex
          row
          justify="center"
          align="center"
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: COLOR.GRAY,
          }}
        >
          <Typography variant="subtitle2" color={COLOR.WHITE}>
            Copyright 2022. 뜬구름 All rights reserved.
          </Typography>
        </Flex>
      </Flex>
    </Style.DefaultLayout>
  );
};

export default DefaultLayout;
