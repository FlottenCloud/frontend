import {
  Button,
  IconButton,
  InputBase,
  Paper,
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
import { Fragment, useCallback, useEffect, useState } from "react";
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
import FigureImage from "components/common/FigureImage";
import useConsoleStore from "store/console";
import SearchIcon from "@mui/icons-material/Search";
import useStatusStore from "store/common/server";
import InstanceCreate from "../create";
import InstanceUpdate from "../update";

const Titles = [
  { name: "Instance Name", width: "15%" },
  { name: "Disk Size", width: "8%" },
  { name: "Ram Size", width: "8%" },
  { name: "CPU core", width: "10%" },
  { name: "IP Address", width: "10%" },
  { name: "Status", width: "10%" },
  { name: "Latest Backup Time", width: "15%" },
  { name: "Next Backup Time", width: "15%" },
  { name: "Actions", width: "9%" },
] as const;

const Openstack = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const statusStore = useStatusStore();
  const [search, setSearch] = useState<string>("");
  const [errors, setErrors] = useState<Array<string>>([]);
  const readInstance = useReadInstance({
    successCallback: (res: ReadInstanceResponse) => {
      const array = [];
      res.instances.map((item) => {
        if (item.status === "RESTORING") {
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
  const consoleStore = useConsoleStore();
  const [load, setLoad] = useState<boolean>(false);
  const [show, setShow] = useState<Array<number>>([]);
  const [createOpen, setCreateOpen] = useState<boolean>(false);
  const [update, setUpdate] = useState<number>(-1);

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
        `인스턴스에 에러가 발생했습니다.\n에러가 발생한 인스턴스 목록 : ${string}\n인스턴스 복구를 진행합니다.`
      );
    }
  }, [errors]);

  const handleCreateClick = useCallback(() => {
    setCreateOpen(true);
  }, []);

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
        successCallback: (res) => {
          console.log(res);
          consoleStore.setUrl(res.instance_url);
          router.push({ pathname: "/console" });
        },
      });
    },
    [consoleInstance, consoleStore, router]
  );

  const handleUpdateClick = useCallback((id: number) => {
    setUpdate(id);
  }, []);

  return (
    <Flex style={{ flex: 1 }}>
      {createOpen && <InstanceCreate close={() => setCreateOpen(false)} />}
      {update !== -1 && (
        <InstanceUpdate id={update} close={() => setUpdate(-1)} />
      )}
      {load && (
        <Flex style={{ flex: 1, position: "relative" }}>
          {!statusStore.getStatus() && (
            <Flex
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "5px",
                width: "100%",
                height: "100%",
                zIndex: 500,
              }}
            >
              <Typography variant="h3" sx={{ color: "white" }}>
                Openstack server not available
              </Typography>
            </Flex>
          )}
          <Flex row justify="space-between" align="center">
            <Flex row gap={10} align="center" padding={[10, 10, 10, 10]}>
              <FigureImage
                src={"/images/openstack.png"}
                alt={"cloudstack"}
                width={30}
                height={30}
                style={{
                  boxShadow: "0px 0px 5px 1px gray",
                  borderRadius: "50px",
                  overflow: "hidden",
                }}
              />
              <Typography variant="h5">Openstack Instances</Typography>
            </Flex>
            <Flex row gap={10}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                  height: 40,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Instance"
                />
                <IconButton type="button" sx={{ p: "10px" }}>
                  <SearchIcon />
                </IconButton>
              </Paper>
              <Button
                variant="outlined"
                onClick={handleRefreshClick}
                startIcon={<RefreshButton />}
                sx={{
                  height: "40px",
                }}
              >
                {"새로고침"}
              </Button>
              <Button
                variant="contained"
                onClick={handleCreateClick}
                startIcon={<CreateButton />}
                sx={{
                  height: "40px",
                }}
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
              {readInstance?.data?.instances
                .filter((instance) => instance.instance_name.includes(search))
                .map((item, index) => {
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
                    <Fragment key={index}>
                      <TableRow
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
                              pathname: `/instance/openstack/${item.instance_pk}`,
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
                              onClick={() =>
                                handleConsoleClick(item.instance_pk)
                              }
                              startIcon={<ConsoleButton />}
                              size="small"
                              color="secondary"
                              sx={{ marginRight: "8px" }}
                            >
                              Console
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() =>
                                handleUpdateClick(item.instance_pk)
                              }
                              startIcon={<UpdateButton />}
                              size="small"
                              color="inherit"
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableStyledRow>
                      )}
                    </Fragment>
                  );
                })}
            </TableBody>
          </Table>
        </Flex>
      )}
    </Flex>
  );
};

export default Openstack;

const TabelStyledCell = styled(TableCell)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
