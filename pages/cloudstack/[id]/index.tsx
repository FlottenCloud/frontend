import { Button, Typography } from "@mui/material";
import DefaultLayout from "layout/DefaultLayout";
import BackIcon from "@mui/icons-material/ArrowBack";
import Flex from "components/common/Flex";
import { useRouter } from "next/router";
import { COLOR } from "constants/common/theme";
import useReadOneCloudstack from "hooks/api/instance/useReadOneCloudstack";

const InstanceDetail = [
  { name: "Instance Name", width: "14%" },
  { name: "Flavor Name", width: "10%" },
  { name: "Disk Size", width: "9%" },
  { name: "IP Address", width: "10%" },
  { name: "Ram Size", width: "9%" },
  { name: "Status", width: "8%" },
  { name: "Start", width: "10%" },
  { name: "Stop", width: "10%" },
  { name: "Delete", width: "10%" },
  { name: "Console", width: "10%" },
  { name: "Update", width: "10%" },
] as const;

const Instance = () => {
  const router = useRouter();
  const { data, isSuccess } = useReadOneCloudstack({
    instance_pk: +router?.query.id,
  });

  return (
    <DefaultLayout>
      <Flex width={90} margin={[0, 0, 8, 0]}>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          startIcon={<BackIcon />}
          size="small"
        >
          Back to List
        </Button>
      </Flex>
      {isSuccess && (
        <>
          <Flex
            gap={6}
            style={{
              border: `1px solid ${COLOR.BORDER}`,
              borderRadius: 8,
              padding: "20px",
            }}
          >
            <Typography variant="h3">{data.instance_name}</Typography>
            <Typography variant="h5">{"instance spec"}</Typography>
            <Typography>{`flavor name : ${data.flavor_name}`}</Typography>
            <Typography>{`disk size : ${data.disk_size}`}</Typography>

            <Typography variant="h5">{"instance info"}</Typography>
            <Typography>{`ip address : ${data.ip_address}`}</Typography>
          </Flex>
        </>
      )}
    </DefaultLayout>
  );
};

export default Instance;
