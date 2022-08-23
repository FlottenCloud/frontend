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
          {children}
        </Style.DisableBackground>
      )}
    </>
  );
};

export default DisableBackground;
