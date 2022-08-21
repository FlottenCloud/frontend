import * as Style from "./style";

interface CenteredLayoutProps {
  children: any;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return <Style.CenteredLayout>{children}</Style.CenteredLayout>;
};

export default CenteredLayout;
