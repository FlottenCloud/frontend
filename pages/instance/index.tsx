import DefaultLayout from "layout/DefaultLayout";
import Flex from "components/common/Flex";
import _ from "lodash-es";
import Openstack from "../../components/instance/openstack";
import Cloudstack from "../../components/instance/cloudstack";

const Instance = () => {
  return (
    <DefaultLayout>
      <Flex gap={120}>
        <Openstack />
        <Cloudstack />
      </Flex>
    </DefaultLayout>
  );
};

export default Instance;
