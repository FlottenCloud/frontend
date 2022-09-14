import Flex from "components/common/Flex";
import useCreateInstance, {
  CreateInstanceParams,
  OS,
  Packages,
} from "hooks/api/instance/useCreateInstance";
import { useCallback, useState } from "react";
import _ from "lodash-es";
import DefaultLayout from "layout/DefaultLayout";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import useUpdateInstance, {
  UpdateInstanceParams,
} from "hooks/api/instance/useUpdateInstance";
import { useRouter } from "next/router";

const InstanceCreate = () => {
  const router = useRouter();
  const updateInstance = useUpdateInstance();
  const [numPeople, setNumPeople] = useState<number>(0);
  const [dataSize, setDataSize] = useState<number>(0);
  const [backupTimes, setBackupTimes] = useState<number>(6);
  const [packages, setPackages] = useState<Array<Packages>>([]);

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const updateParams: UpdateInstanceParams = {
        instance_id: `${router?.query?.id}`,
        num_people: numPeople,
        data_size: dataSize,
        backup_time: backupTimes,
        package: packages,
      };
      updateInstance.mutate(updateParams);
    },
    [
      router?.query?.id,
      numPeople,
      dataSize,
      backupTimes,
      packages,
      updateInstance,
    ]
  );

  return (
    <DefaultLayout>
      <Flex style={{ marginBottom: "20px" }}>
        <Typography variant="h4">Create Instance</Typography>
      </Flex>
      <FormControl
        onSubmit={() => {}}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          width: "300px",
        }}
      >
        <TextField
          label="Number of People"
          variant="outlined"
          value={numPeople}
          type="number"
          onChange={(e) => setNumPeople(+e.target.value)}
        />
        <TextField
          label="Expected Data Size"
          variant="outlined"
          value={dataSize}
          type="number"
          onChange={(e) => setDataSize(+e.target.value)}
        />
        <FormControl>
          <InputLabel id="Backup">Backup Times</InputLabel>
          <Select
            labelId="Backup"
            id="Backup"
            value={backupTimes}
            label="Backup Times"
            onChange={(e) => setBackupTimes(+e.target.value)}
          >
            {[6, 12].map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <FormGroup
            sx={{ display: "flex", flexDirection: "row", width: "100%" }}
          >
            {Object.values(Packages).map((item, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox key={index} />}
                label={item}
                sx={{ width: "40%" }}
                checked={packages.some((e) => e === item)}
                onChange={(e) => {
                  let newPackages = [...packages];
                  if (packages.some((p) => p === item)) {
                    newPackages = _.remove(newPackages, (n) => n !== item);
                  } else {
                    newPackages.push(item);
                  }
                  setPackages(newPackages);
                }}
              />
            ))}
          </FormGroup>
        </Box>
        <Button variant="contained" onClick={handleCreateClick}>
          Create Instance
        </Button>
      </FormControl>
    </DefaultLayout>
  );
};

export default InstanceCreate;
