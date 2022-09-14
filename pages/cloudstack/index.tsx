import { Button, Table, TableCell, TableHead, TableRow } from "@mui/material";
import useReadInstance from "hooks/api/instance/useReadInstance";
import usePostModal from "hooks/common/usePostModal";
import DefaultLayout from "layout/DefaultLayout";
import { useCallback, useEffect, useState } from "react";
import StartIcon from "@mui/icons-material/Start";
import StopIcon from "@mui/icons-material/Stop";
import DeleteButton from "components/instance/DeleteButton";
import useStartInstance from "hooks/api/instance/useStartInstance";
import useStopInstance from "hooks/api/instance/useStopInstance";
import Flex from "components/common/Flex";
import { useQueryClient } from "react-query";
import RefreshButton from "@mui/icons-material/Refresh";
import ConsoleButton from "@mui/icons-material/Computer";
import useConsoleInstance from "hooks/api/instance/useConsoleInstance";
import useReadCloudstack from "hooks/api/instance/useReadCloudstack";

const Titles = [
  { name: "Instance Name", width: "20%" },
  { name: "Flavor Name", width: "10%" },
  { name: "Disk Size", width: "10%" },
  { name: "IP Address", width: "10%" },
  { name: "Ram Size", width: "10%" },
  { name: "Status", width: "10%" },
  { name: "Start", width: "10%" },
  { name: "Stop", width: "10%" },
  { name: "Console", width: "10%" },
] as const;

const Cloudstack = () => {
  const queryClient = useQueryClient();
  const readInstance = useReadCloudstack({});
  const startInstance = useStartInstance();
  const stopInstance = useStopInstance();
  const consoleInstance = useConsoleInstance();
  const [load, setLoad] = useState<boolean>(false);

  const handleStartClick = useCallback(
    (id: string) => {
      startInstance.mutate({ instance_id: id, isCloudStack: true });
    },
    [startInstance]
  );

  const handleStopClick = useCallback(
    (id: string) => {
      stopInstance.mutate({ instance_id: id, isCloudStack: true });
    },
    [stopInstance]
  );

  usePostModal({ mutation: startInstance });
  usePostModal({ mutation: stopInstance });

  useEffect(() => {
    setLoad(true);
  }, []);

  const handleRefreshClick = useCallback(() => {
    queryClient.invalidateQueries("read_instance");
  }, [queryClient]);

  const handleConsoleClick = useCallback(
    (id: string) => {
      consoleInstance.mutate({
        instance_id: id,
        isCloudStack: true,
        successCallback: (res) => window.open(res.instance_url),
      });
    },
    [consoleInstance]
  );

  return (
    <DefaultLayout>
      {load && (
        <>
          <Flex row justify="flex-end" gap={10}>
            <Button
              variant="outlined"
              onClick={handleRefreshClick}
              startIcon={<RefreshButton />}
            >
              {"새로고침"}
            </Button>
          </Flex>
          <Table>
            <TableHead>
              {Titles.map((item, index) => (
                <TableCell
                  key={index}
                  align="center"
                  style={{ width: item.width }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableHead>
            {readInstance?.data?.instances.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.instance_name}</TableCell>
                <TableCell align="center">{item.flavor_name}</TableCell>
                <TableCell align="right">{`${item.disk_size}GB`}</TableCell>
                <TableCell align="center">{item.ip_address}</TableCell>
                <TableCell align="right">{`${item.ram_size}GB`}</TableCell>
                <TableCell align="center">{item.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => handleStartClick(item.instance_id)}
                    startIcon={<StartIcon />}
                    size="small"
                  >
                    Start
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    onClick={() => handleStopClick(item.instance_id)}
                    startIcon={<StopIcon />}
                    size="small"
                    color="error"
                  >
                    Stop
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={() => handleConsoleClick(item.instance_id)}
                    startIcon={<ConsoleButton />}
                    size="small"
                    color="secondary"
                  >
                    Console
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </>
      )}
    </DefaultLayout>
  );
};

export default Cloudstack;