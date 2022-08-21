import Flex from "components/common/Flex";
import _ from "lodash-es";
import DefaultLayout from "layout/DefaultLayout";
import DashboardItem from "components/dashboard/DashboardItem";
import useReadDash from "hooks/api/openstack/useGetDash";

const Dashboard = () => {
  const readDash = useReadDash({});

  return (
    <DefaultLayout>
      <Flex row gap={20}>
        <DashboardItem
          used={readDash?.data?.ram_size}
          total={50}
          title={"MEMORY"}
        />
        <DashboardItem
          used={readDash?.data?.volume_size}
          total={50}
          title={"DISK"}
        />
      </Flex>
    </DefaultLayout>
  );
};

export default Dashboard;
