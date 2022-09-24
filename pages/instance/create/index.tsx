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
import usePostModal from "hooks/common/usePostModal";
import { useRouter } from "next/router";

const InstanceCreate = () => {
  const router = useRouter();
  const createInstance = useCreateInstance();
  const [os, setOs] = useState<string>(OS.FEDORA);
  const [name, setName] = useState<string>("");
  const [numPeople, setNumPeople] = useState<number>(1);
  const [dataSize, setDataSize] = useState<number>(1);
  const [backupTimes, setBackupTimes] = useState<number>(6);
  const [packages, setPackages] = useState<Array<Packages>>([]);

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const createParams: CreateInstanceParams = {
        os,
        instance_name: name,
        num_people: numPeople,
        data_size: dataSize,
        backup_time: backupTimes,
        package: packages,
        successCallback: () => router.push({ pathname: "/instance" }),
      };
      createInstance.mutate(createParams);
    },
    [
      backupTimes,
      createInstance,
      dataSize,
      name,
      numPeople,
      os,
      packages,
      router,
    ]
  );

  usePostModal({ mutation: createInstance });

  const handleChagne = useCallback((handler, value) => {
    if (value < 1) return;
    else handler(value);
  }, []);

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
        <FormControl>
          <InputLabel id="OS">OS</InputLabel>
          <Select
            labelId="OS"
            id="OS"
            value={os}
            label="OS"
            onChange={(e) => setOs(e.target.value)}
          >
            {Object.values(OS).map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Instance Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            const value = e.target.value;
            const newValue = value.replace("_", "");
            setName(newValue);
          }}
        />
        <TextField
          label="Number of People"
          variant="outlined"
          value={numPeople}
          type="number"
          onChange={(e) => handleChagne(setNumPeople, +e.target.value)}
        />
        <TextField
          label="Expected Data Size"
          variant="outlined"
          value={dataSize}
          type="number"
          onChange={(e) => handleChagne(setDataSize, +e.target.value)}
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
