import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import useCreateInstance from "hooks/api/instance/useCreateInstance";
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
import CreateButton from "@mui/icons-material/Create";
import ConsoleButton from "@mui/icons-material/Computer";
import UpdateButton from "@mui/icons-material/Update";
import useConsoleInstance from "hooks/api/instance/useConsoleInstance";
import { useRouter } from "next/router";
import { ReadInstanceResponse } from "types/api/instance/readInstance";

const Titles = [
  { name: "Instance Name", width: "14%" },
  { name: "Flavor Name", width: "10%" },
  { name: "Disk Size", width: "9%" },
  { name: "IP Address", width: "10%" },
  { name: "Ram Size", width: "9%" },
  { name: "Status", width: "8%" },
  { name: "Start", width: "10%" },
  { name: "Stop", width: "10%" },
  { name: "Delete", width: "10%" },
  { name: "Console", width: "10%" },
  { name: "Update", width: "10%" },
] as const;

const Instance = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<Array<string>>([]);
  const readInstance = useReadInstance({
    successCallback: (res: ReadInstanceResponse) => {
      const array = [];
      res.instances.map((item) => {
        if (item.status === "ERROR") {
          array.push(item.instance_name);
        }
      });
      setErrors(array);
    },
  });
  const createInstance = useCreateInstance();
  const startInstance = useStartInstance();
  const stopInstance = useStopInstance();
  const consoleInstance = useConsoleInstance();
  const [load, setLoad] = useState<boolean>(false);

  useEffect(() => {
    if (errors.length > 0) {
      const string = errors.map((item, index) => {
        let itemString = item;
        if (index !== errors.length - 1) {
          itemString += ", ";
        }
        return itemString;
      });
      window.alert(
        `인스턴스에 에러가 발생했습니다.\n에러가 발생한 인스턴스 목록 : ${string}\n인스턴스 복구를 시작합니다.`
      );
    }
  }, [errors]);

  const handleCreateClick = useCallback(() => {
    router.push({ pathname: "/instance/create" });
  }, [router]);

  const handleStartClick = useCallback(
    (id: number) => {
      startInstance.mutate({ instance_pk: id });
    },
    [startInstance]
  );

  const handleStopClick = useCallback(
    (id: number) => {
      stopInstance.mutate({ instance_pk: id });
    },
    [stopInstance]
  );

  usePostModal({ mutation: createInstance });
  usePostModal({ mutation: startInstance });
  usePostModal({ mutation: stopInstance });

  useEffect(() => {
    setLoad(true);
  }, []);

  const handleRefreshClick = useCallback(() => {
    queryClient.invalidateQueries("read_instance");
  }, [queryClient]);

  const handleConsoleClick = useCallback(
    (id: number) => {
      consoleInstance.mutate({
        instance_pk: id,
        successCallback: (res) => window.open(res.instance_url),
      });
    },
    [consoleInstance]
  );

  const handleUpdateClick = useCallback(
    (id: number) => {
      router.push({ pathname: `/instance/update/${id}` });
    },
    [router]
  );

  return (
    <DefaultLayout>
      {load && (
        <>
          <Flex row justify="space-between">
            <Typography variant="h4">Openstack Instances</Typography>
            <Flex row gap={10}>
              <Button
                variant="outlined"
                onClick={handleRefreshClick}
                startIcon={<RefreshButton />}
              >
                {"새로고침"}
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateClick}
                startIcon={<CreateButton />}
              >
                {"인스턴스 생성"}
              </Button>
            </Flex>
          </Flex>
          <Table>
            <TableHead>
              <TableRow>
                {Titles.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{ width: item.width }}
                  >
                    {item.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
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
                      onClick={() => handleStartClick(item.instance_pk)}
                      startIcon={<StartIcon />}
                      size="small"
                    >
                      Start
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleStopClick(item.instance_pk)}
                      startIcon={<StopIcon />}
                      size="small"
                      color="error"
                    >
                      Stop
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <DeleteButton id={item.instance_pk} />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleConsoleClick(item.instance_pk)}
                      startIcon={<ConsoleButton />}
                      size="small"
                      color="secondary"
                    >
                      Console
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      onClick={() => handleUpdateClick(item.instance_pk)}
                      startIcon={<UpdateButton />}
                      size="small"
                      color="inherit"
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </DefaultLayout>
  );
};

export default Instance;
