import Flex from "components/common/Flex";
import _ from "lodash-es";
import DefaultLayout from "layout/DefaultLayout";
import DashboardItem from "components/dashboard/DashboardItem";
import { Typography } from "@mui/material";
import useReadClouddash from "hooks/api/openstack/useGetClouddash";

const Dashboard = () => {
  const readDash = useReadClouddash({});

  return (
    <DefaultLayout>
      <Flex margin={[0, 0, 20, 0]}>
        <Typography variant="h4">Cloudstack Dashboard</Typography>
      </Flex>
      <Flex row gap={20}>
        <DashboardItem
          used={readDash?.data?.num_instances ?? 0}
          total={10}
          title={"Created Instances"}
          unit={""}
        />
        <DashboardItem
          used={readDash?.data?.total_num_cpu ?? 0}
          total={20}
          title={"CPU Count"}
          unit={""}
        />
        <DashboardItem
          used={readDash?.data?.total_ram_size ?? 0}
          total={50}
          title={"Used Memory"}
        />
        <DashboardItem
          used={readDash?.data?.total_disk_size ?? 0}
          total={50}
          title={"Used Disk"}
        />
      </Flex>
    </DefaultLayout>
  );
};

export default Dashboard;
