import {
  Button,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import usePostModal from "hooks/common/usePostModal";
import DefaultLayout from "layout/DefaultLayout";
import { useCallback, useEffect, useState } from "react";
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

const Titles = [
  { name: "Instance Name", width: "30%" },
  { name: "Num CPU", width: "15%" },
  { name: "Disk Size", width: "10%" },
  { name: "IP Address", width: "15%" },
  { name: "Ram Size", width: "10%" },
  { name: "Status", width: "10%" },
  { name: "Actions", width: "10%" },
] as const;

const Cloudstack = () => {
  const queryClient = useQueryClient();
  const readInstance = useReadCloudstack({});
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
    queryClient.invalidateQueries("read_instance");
  }, [queryClient]);

  const handleConsoleClick = useCallback(
    (id: number) => {
      consoleInstance.mutate({
        instance_pk: id,
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
          <Flex row justify="space-between">
            <Typography variant="h4">Cloudstack Instances</Typography>
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
                            pathname: `/cloudstack/${item.instance_pk}`,
                          });
                        }}
                        sx={tableCellStyle}
                      >
                        {item.instance_name}
                      </TabelStyledCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.num_cpu}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={tableCellStyle}
                      >{`${item.disk_size}GB`}</TableCell>
                      <TableCell align="center" sx={tableCellStyle}>
                        {item.ip_address}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={tableCellStyle}
                      >{`${item.ram_size}GB`}</TableCell>
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
                            onClick={() => handleConsoleClick(item.instance_pk)}
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

export default Cloudstack;

const TabelStyledCell = styled(TableCell)`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;
