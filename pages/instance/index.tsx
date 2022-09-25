import {
  Button,
  IconButton,
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
import _ from "lodash-es";
import TableStyledRow from "components/common/TableStyledRow";
import DownIcon from "@mui/icons-material/ArrowDropDown";
import UpIcon from "@mui/icons-material/ArrowDropUp";
import styled from "@emotion/styled";

const Titles = [
  { name: "Instance Name", width: "15%" },
  { name: "Disk Size", width: "8%" },
  { name: "Ram Size", width: "8%" },
  { name: "Num CPU", width: "10%" },
  { name: "IP Address", width: "10%" },
  { name: "Status", width: "10%" },
  { name: "Latest Backup Time", width: "15%" },
  { name: "Next Backup Time", width: "15%" },
  { name: "Actions", width: "9%" },
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
  const [show, setShow] = useState<Array<number>>([]);

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
              {readInstance?.data?.instances.map((item, index) => {
                const isShow = show.some((e) => e === item.instance_pk);
                const tableCellStyle = isShow
                  ? {
                      borderBottom: "none",
                      padding: "10px",
                    }
                  : {
                      padding: "10px",
                    };
                return (
                  <>
                    <TableRow
                      key={index}
                      sx={{
                        zIndex: 999999,
                        position: "sticky",
                        backgroundColor: "white",
                      }}
                    >
                      <TabelStyledCell
                        align="center"
                        onClick={() => {
                          router.push({
                            pathname: `/instance/${item.instance_pk}`,
                          });
                        }}
                        sx={tableCellStyle}
                      >
                        {item.instance_name}
                      </TabelStyledCell>
                      <TableCell
                        align="center"
                        sx={tableCellStyle}
                      >{`${item.disk_size}GB`}</TableCell>
                      <TableCell
                        align="center"
                        sx={tableCellStyle}
                      >{`${item.ram_size}GB`}</TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.num_cpu}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.ip_address}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.status}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.backup_completed_time}
                      </TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.next_backup_time}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={tableCellStyle}
                        onClick={() => {
                          let newShow = [...show];
                          if (show.some((p) => p === item.instance_pk)) {
                            newShow = _.remove(
                              newShow,
                              (n) => n !== item.instance_pk
                            );
                          } else {
                            newShow.push(item.instance_pk);
                          }
                          setShow(newShow);
                        }}
                      >
                        <IconButton>
                          {show.some((e) => e === item.instance_pk) ? (
                            <UpIcon />
                          ) : (
                            <DownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {show.some((e) => e === item.instance_pk) && (
                      <TableStyledRow>
                        <TableCell
                          colSpan={11}
                          sx={{
                            textAlign: "right",
                            padding: "0 0 8px 0",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => handleStartClick(item.instance_pk)}
                            startIcon={<StartIcon />}
                            size="small"
                            sx={{ marginRight: "8px" }}
                          >
                            Start
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => handleStopClick(item.instance_pk)}
                            startIcon={<StopIcon />}
                            size="small"
                            color="error"
                            sx={{ marginRight: "8px" }}
                          >
                            Stop
                          </Button>
                          <DeleteButton id={item.instance_pk} />
                          <Button
                            variant="contained"
                            onClick={() => handleConsoleClick(item.instance_pk)}
                            startIcon={<ConsoleButton />}
                            size="small"
                            color="secondary"
                            sx={{ marginRight: "8px" }}
                          >
                            Console
                          </Button>
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
                      </TableStyledRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </>
      )}
    </DefaultLayout>
  );
};

export default Instance;

const TabelStyledCell = styled(TableCell)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
