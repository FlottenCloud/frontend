import Flex from "components/common/Flex";
import _ from "lodash-es";
import DefaultLayout from "layout/DefaultLayout";
import DashboardItem from "components/dashboard/DashboardItem";
import useReadDash from "hooks/api/openstack/useGetDash";
import { Typography } from "@mui/material";
import useReadClouddash from "hooks/api/openstack/useGetClouddash";
import FigureImage from "components/common/FigureImage";
import { COLOR } from "constants/common/theme";
import useReadProfile from "hooks/api/auth/useProfile";
import useReadLogs from "hooks/api/common/useReadLogs";
import { useState } from "react";
import { ReadProfileResponse } from "types/api/auth/readProfile";
import LogItem from "components/dashboard/LogItem";

const Dashboard = () => {
  const [id, setId] = useState<string>("");
  const readOpenDash = useReadDash({});
  const readCloudDash = useReadClouddash({});
  const readProfile = useReadProfile({
    successCallback: (res: ReadProfileResponse) => setId(res.user_id),
  });
  const readLogs = useReadLogs({ id });

  return (
    <DefaultLayout>
      <Flex row gap={40} style={{ maxHeight: "100%" }}>
        <Flex gap={80} style={{ maxHeight: "100%" }}>
          <Flex>
            <Flex row margin={[0, 0, 20, 0]} gap={10} align="center">
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
              <Typography variant="h5">Openstack Dashboard</Typography>
            </Flex>
            <Flex row gap={20}>
              <DashboardItem
                used={readOpenDash?.data?.num_instances ?? 0}
                total={10}
                title={"Created Instances"}
                unit={""}
              />
              <DashboardItem
                used={readOpenDash?.data?.total_num_cpu ?? 0}
                total={20}
                title={"CPU Count"}
                unit={""}
              />
              <DashboardItem
                used={readOpenDash?.data?.total_ram_size ?? 0}
                total={50}
                title={"Used Memory"}
              />
              <DashboardItem
                used={readOpenDash?.data?.total_disk_size ?? 0}
                total={50}
                title={"Used Disk"}
              />
            </Flex>
          </Flex>
          <Flex>
            <Flex row margin={[0, 0, 20, 0]} gap={10} align="center">
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
              <Typography variant="h5">Cloudstack Dashboard</Typography>
            </Flex>
            <Flex row gap={20} align="center">
              <DashboardItem
                used={readCloudDash?.data?.num_instances ?? 0}
                total={10}
                title={"Created Instances"}
                unit={""}
              />
              <DashboardItem
                used={readCloudDash?.data?.total_num_cpu ?? 0}
                total={20}
                title={"CPU Count"}
                unit={""}
              />
              <DashboardItem
                used={readCloudDash?.data?.total_ram_size ?? 0}
                total={50}
                title={"Used Memory"}
              />
              <DashboardItem
                used={readCloudDash?.data?.total_disk_size ?? 0}
                total={50}
                title={"Used Disk"}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex style={{ flex: 1, maxHeight: "100%" }} gap={20}>
          <Typography variant="h5">Logs</Typography>
          <Flex
            gap={4}
            padding={[10, 10, 10, 10]}
            style={{
              border: `1px solid ${COLOR.BORDER}`,
              flex: 1,
              borderRadius: 5,
              overflowY: "auto",
            }}
          >
            {readLogs?.data?.log?.map((log, index) => (
              <Flex
                key={log.id}
                style={{
                  borderBottom: `${
                    index === readLogs?.data?.log?.length - 1 ? 0 : 1
                  }px solid ${COLOR.BORDER}`,
                }}
              >
                <LogItem log={log} />
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </DefaultLayout>
  );
};

export default Dashboard;
