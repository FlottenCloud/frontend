import Flex from "components/common/Flex";
import _ from "lodash-es";
import DefaultLayout from "layout/DefaultLayout";
import DashboardItem from "components/dashboard/DashboardItem";
import useReadDash from "hooks/api/openstack/useGetDash";
import { Typography } from "@mui/material";

const Dashboard = () => {
  const readDash = useReadDash({});

  return (
    <DefaultLayout>
      <Flex>
        <Flex style={{ marginBottom: 20 }}>
          <Typography variant="h5">{"Summary"}</Typography>
          <Typography>{`Num of Instances : ${
            readDash?.data?.num_instances ?? 0
          }`}</Typography>
          <Typography>{`Total Num CPU : ${
            readDash?.data?.total_num_cpu ?? 0
          }`}</Typography>
        </Flex>
        <Typography variant="h5">{"Dashboard"}</Typography>
        <Flex row gap={20}>
          <DashboardItem
            used={readDash?.data?.total_ram_size ?? 0}
            total={50}
            title={"MEMORY"}
          />
          <DashboardItem
            used={readDash?.data?.total_disk_size ?? 0}
            total={50}
            title={"DISK"}
          />
        </Flex>
        {/* <DashboardItem
          used={readDash?.data?.gpu_size ?? 10}
          total={50}
          title={"GPU"}
        /> */}
      </Flex>
    </DefaultLayout>
  );
};

export default Dashboard;
