import {
  Button,
  IconButton,
  InputBase,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import usePostModal from "hooks/common/usePostModal";
import { Fragment, useCallback, useEffect, useState } from "react";
import StartIcon from "@mui/icons-material/Start";
import StopIcon from "@mui/icons-material/Stop";
import useStartInstance from "hooks/api/instance/useStartInstance";
import useStopInstance from "hooks/api/instance/useStopInstance";
import Flex from "components/common/Flex";
import { useQueryClient } from "react-query";
import RefreshButton from "@mui/icons-material/Refresh";
import ConsoleButton from "@mui/icons-material/Computer";
import useConsoleInstance from "hooks/api/instance/useConsoleInstance";
import useReadCloudstack from "hooks/api/instance/useReadCloudstack";
import TableStyledRow from "components/common/TableStyledRow";
import DownIcon from "@mui/icons-material/ArrowDropDown";
import UpIcon from "@mui/icons-material/ArrowDropUp";
import { useRouter } from "next/router";
import _ from "lodash-es";
import FigureImage from "components/common/FigureImage";
import SearchIcon from "@mui/icons-material/Search";
import useConsoleStore from "store/console";
import useStatusStore from "store/common/server";
import InstanceCreate from "../create";

const Titles = [
  { name: "Instance Name", width: "30%" },
  { name: "Disk Size", width: "10%" },
  { name: "Ram Size", width: "10%" },
  { name: "CPU core", width: "15%" },
  { name: "IP Address", width: "15%" },
  { name: "Status", width: "10%" },
  { name: "Actions", width: "10%" },
] as const;

const Cloudstack = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const readInstance = useReadCloudstack({});
  const statusStore = useStatusStore();
  const consoleStore = useConsoleStore();
  const startInstance = useStartInstance();
  const stopInstance = useStopInstance();
  const consoleInstance = useConsoleInstance();
  const [load, setLoad] = useState<boolean>(false);
  const router = useRouter();
  const [show, setShow] = useState<Array<number>>([]);

  const handleStartClick = useCallback(
    (id: number) => {
      startInstance.mutate({ instance_pk: id, isCloudStack: true });
    },
    [startInstance]
  );

  const handleStopClick = useCallback(
    (id: number) => {
      stopInstance.mutate({ instance_pk: id, isCloudStack: true });
    },
    [stopInstance]
  );

  usePostModal({ mutation: startInstance });
  usePostModal({ mutation: stopInstance });

  useEffect(() => {
    setLoad(true);
  }, []);

  const handleRefreshClick = useCallback(() => {
    queryClient.invalidateQueries("read_instance_cloud");
  }, [queryClient]);

  const handleConsoleClick = useCallback(
    (id: number) => {
      consoleInstance.mutate({
        instance_pk: id,
        isCloudStack: true,
        successCallback: (res) => {
          console.log(res);
          consoleStore.setUrl(res.instance_url);
          router.push({ pathname: "/console" });
        },
      });
    },
    [consoleInstance, consoleStore, router]
  );

  return (
    <Flex style={{ flex: 1 }}>
      {load && (
        <Flex style={{ flex: 1, position: "relative" }}>
          {statusStore.getStatus() && (
            <Flex
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0.03)",
                borderRadius: "5px",
                width: "100%",
                height: "100%",
                zIndex: 500,
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: "rgb(240,240,240)" }}
              ></Typography>
            </Flex>
          )}
          <Flex
            row
            justify="space-between"
            align="center"
            padding={[10, 10, 10, 10]}
          >
            <Flex row gap={10} align="center">
              <FigureImage
                src={"/images/cloudstack.png"}
                alt={"cloudstack"}
                width={30}
                height={30}
                style={{
                  boxShadow: "0px 0px 5px 1px gray",
                  borderRadius: "50px",
                  overflow: "hidden",
                }}
              />
              <Typography variant="h5">Cloudstack Instances</Typography>
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
                              pathname: `/instance/cloudstack/${item.instance_pk}`,
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

export default Cloudstack;

const TabelStyledCell = styled(TableCell)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
