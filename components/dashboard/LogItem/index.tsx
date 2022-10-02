import { Typography } from "@mui/material";
import FigureImage from "components/common/FigureImage";
import Flex from "components/common/Flex";
import { Log } from "types/api/common/readLogs";

interface LogItemProps {
  log: Log;
}

const USER_LOG = ["Sign In", "Sign Up"];

const LogItem = ({ log }: LogItemProps) => {
  const logString = `${fillZero(log.id)}.  ${sliceTime(log.log_time)}`;
  const icon = isUserLog(log.log) ? "/images/user.png" : "/images/instance.png";
  return (
    <Flex row align="center" gap={10} style={{ padding: "10px 0" }}>
      <FigureImage
        src={icon}
        alt={"cloudstack"}
        width={20}
        height={20}
        style={{
          boxShadow: "0px 0px 1px 2px gray",
          borderRadius: "50px",
          overflow: "hidden",
        }}
      />
      <Flex>
        <Typography whiteSpace={"pre-wrap"}>{logString}</Typography>
        <Typography whiteSpace={"pre-wrap"}>{log.log}</Typography>
      </Flex>
    </Flex>
  );
};

export default LogItem;

const isUserLog = (log: string) => {
  return USER_LOG.includes(log);
};

const fillZero = (id: number) => {
  return id < 10 ? `0${id}` : id;
};

const sliceTime = (time: string) => {
  const slicedTime = time.slice(0, 19);
  return slicedTime.replace("T", " ");
};
