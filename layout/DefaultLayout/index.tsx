import Flex from "components/common/Flex";
import Loading from "components/common/Loading";
import PostModal from "dependency/PostModal";
import { useIsFetching } from "react-query";
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
        <Flex style={{ padding: "20px" }}>{children}</Flex>
        {pages !== 0 && pages !== undefined && <Pagination pages={pages} />}
      </Flex>
    </Style.DefaultLayout>
  );
};

export default DefaultLayout;
