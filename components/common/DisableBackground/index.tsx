import Flex from "../Flex";
import * as Style from "./style";

interface DisableBackgroundProps {
  children?: any;
  isShow?: boolean;
  isHover?: boolean;
  onClick?: () => void;
  zIndex?: number;
}

const DisableBackground = ({
  children,
  isShow = true,
  isHover = false,
  onClick = () => {},
  zIndex = 9999,
}: DisableBackgroundProps) => {
  return (
    <>
      {isShow && (
        <Style.DisableBackground
          isHover={isHover}
          onClick={onClick}
          zIndex={zIndex}
        >
          <Flex onClick={(e) => e.stopPropagation()}>{children}</Flex>
        </Style.DisableBackground>
      )}
    </>
  );
};

export default DisableBackground;
