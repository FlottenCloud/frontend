import PostModal from "dependency/PostModal";
import * as Style from "./style";

interface CenteredLayoutProps {
  children: any;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return (
    <Style.CenteredLayout>
      <PostModal />
      {children}
    </Style.CenteredLayout>
  );
};

export default CenteredLayout;
