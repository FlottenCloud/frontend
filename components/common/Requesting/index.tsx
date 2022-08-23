import DisableBackground from "../DisableBackground";
import * as Style from "./style";

const Requesting = () => {
  return (
    <DisableBackground zIndex={10000}>
      <Style.RequestingBar />
    </DisableBackground>
  );
};

export default Requesting;
