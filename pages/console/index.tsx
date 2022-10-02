import { Typography } from "@mui/material";
import Flex from "components/common/Flex";
import DefaultLayout from "layout/DefaultLayout";
import useConsoleStore from "store/console";

const Console = () => {
  const consoleStore = useConsoleStore();

  return (
    <DefaultLayout>
      <Flex style={{ width: "100%", height: "calc(100vh - 110.43px)" }}>
        {consoleStore.getUrl() === "" && (
          <Flex align="center">
            <Typography>No Floated Console</Typography>
          </Flex>
        )}
        {consoleStore.getUrl() !== "" && (
          <iframe
            src={consoleStore.getUrl()}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        )}
      </Flex>
    </DefaultLayout>
  );
};

export default Console;
