import { Button, Typography } from "@mui/material";
import DefaultLayout from "layout/DefaultLayout";
import BackIcon from "@mui/icons-material/ArrowBack";
import Flex from "components/common/Flex";
import { useRouter } from "next/router";
import useReadOneInstance from "hooks/api/instance/useReadOneInstance";
import { COLOR } from "constants/common/theme";

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
  const { data, isSuccess } = useReadOneInstance({
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
            <Typography variant="h2">{data.instance_name}</Typography>
            <Typography variant="h5">{"SPEC"}</Typography>
            <Typography>{`installed os : ${data.os}`}</Typography>
            <Typography>{`disk size : ${data.disk_size} GB`}</Typography>
            <Typography>{`ram size : ${data.ram_size} GB`}</Typography>
            <Typography>{`cpu core : ${data.num_cpu}`}</Typography>
            <Typography>Installed Packages</Typography>
            <Flex>
              <ul style={{ margin: 0 }}>
                {data?.package?.split(",").map((item) => (
                  <li key={item}>
                    <Typography>{item}</Typography>
                  </li>
                ))}
              </ul>
            </Flex>
            <Typography variant="h5">{"INFO"}</Typography>
            <Typography>{`ip address : ${data.ip_address}`}</Typography>
            <Typography>{`backup cycle : ${data.backup_time} hour`}</Typography>
            <Typography>{`Latest backup time : ${data.backup_completed_time}`}</Typography>
          </Flex>
        </>
      )}
    </DefaultLayout>
  );
};

export default Instance;
