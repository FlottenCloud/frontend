import Image from "next/image";
import * as Style from "./style";

interface FigureImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  priority?: boolean;
  borderRadius?: number;
  backgroundColor?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const FigureImage = (props: FigureImageProps) => {
  const { width, height, src, alt, priority, borderRadius, backgroundColor, onClick, style } =
    props;

  return (
    <Style.FigureImage
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      onClick={onClick}
      hover={onClick !== undefined}
      style={style}
    >
      {<Image src={src} alt={alt} layout="fill" priority={priority} />}
    </Style.FigureImage>
  );
};

export default FigureImage;
