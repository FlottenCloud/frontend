import Flex from "components/common/Flex";
import { Packages } from "hooks/api/instance/useCreateInstance";
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
import useReadOneInstance from "hooks/api/instance/useReadOneInstance";
import { ReadOneInstanceResponse } from "types/api/instance/readOneInstance";
import usePostModal from "hooks/common/usePostModal";

const InstanceCreate = () => {
  const router = useRouter();
  const updateInstance = useUpdateInstance();
  const [numPeople, setNumPeople] = useState<number>(0);
  const [dataSize, setDataSize] = useState<number>(0);
  const [backupTimes, setBackupTimes] = useState<number>(6);
  const [packages, setPackages] = useState<Array<string>>([]);
  const [disabled, setDisalbed] = useState<Array<string>>([]);

  usePostModal({ mutation: updateInstance });

  useReadOneInstance({
    instance_pk: +router?.query.id,
    successCallback: (res: ReadOneInstanceResponse) => {
      if (res.package !== "") {
        const array = res.package.split(",");
        setPackages(array);
        setDisalbed(array);
      }
      setNumPeople(+res.num_people);
      setDataSize(+res.expected_data_size);
      setBackupTimes(res.backup_time);
    },
  });

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const updateParams: UpdateInstanceParams = {
        instance_pk: +router?.query?.id,
        num_people: numPeople,
        data_size: dataSize,
        backup_time: backupTimes,
        package: packages,
        successCallback: () => router.push({ pathname: "/instance" }),
      };
      updateInstance.mutate(updateParams);
    },
    [router, numPeople, dataSize, backupTimes, packages, updateInstance]
  );

  return (
    <DefaultLayout>
      <Flex style={{ marginBottom: "20px" }}>
        <Typography variant="h4">Update Instance</Typography>
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
                disabled={disabled.some((e) => e === item)}
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
          Update Instance
        </Button>
      </FormControl>
    </DefaultLayout>
  );
};

export default InstanceCreate;
