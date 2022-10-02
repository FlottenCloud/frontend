import DefaultLayout from "layout/DefaultLayout";
import Flex from "components/common/Flex";
import _ from "lodash-es";
import Openstack from "../../components/instance/openstack";
import Cloudstack from "../../components/instance/cloudstack";

const Instance = () => {
  return (
    <DefaultLayout>
      <Flex style={{ height: "100%", overflow: "hidden" }}>
        <Openstack />
        <Cloudstack />
      </Flex>
    </DefaultLayout>
  );
};

export default Instance;
