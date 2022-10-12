import Flex from "components/common/Flex";
import useCreateInstance, {
  CreateInstanceParams,
  OS,
  PCspecs,
  Packages,
} from "hooks/api/instance/useCreateInstance";
import { useCallback, useState } from "react";
import _ from "lodash-es";
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
import DisableBackground from "components/common/DisableBackground";

interface InstanceCreateProps {
  close: () => void;
}

const InstanceCreate = (props: InstanceCreateProps) => {
  const router = useRouter();
  const createInstance = useCreateInstance();
  const [os, setOs] = useState<string>(OS.FEDORA);
  const [name, setName] = useState<string>("");
  // const [numPeople, setNumPeople] = useState<number>(1);
  // const [dataSize, setDataSize] = useState<number>(1);
  const [pcSpecs, setPCspecs] = useState<string>(PCspecs.LOW);
  const [backupTimes, setBackupTimes] = useState<number>(6);
  const [packages, setPackages] = useState<Array<Packages>>([]);

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const createParams: CreateInstanceParams = {
        os,
        instance_name: name,
        // num_people: numPeople,
        // data_size: dataSize,
        pc_spec: pcSpecs,
        backup_time: backupTimes,
        package: packages,
        successCallback: () => router.push({ pathname: "/instance" }),
      };
      createInstance.mutate(createParams);
    },
    [
      backupTimes,
      createInstance,
      // dataSize,
      name,
      // numPeople,
      pcSpecs,
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
    <DisableBackground zIndex={999} onClick={props.close}>
      <Flex
        padding={[20, 20, 20, 20]}
        align="center"
        justify="center"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <Flex style={{ marginBottom: "20px" }}>
          <Typography variant="h5">Create Instance</Typography>
        </Flex>
        <FormControl
          onSubmit={() => {}}
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "20px",
            width: "400px",
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
          {/* <TextField
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
        /> */}
          <FormControl>
            <InputLabel id="pcSpec">PC Spec</InputLabel>
            <Select
              value={pcSpecs}
              label="PC Spec"
              onChange={(e) => setPCspecs(e.target.value)}
            >
              {Object.values(PCspecs).map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
                  sx={{ width: "48%" }}
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
      </Flex>
    </DisableBackground>
  );
};

export default InstanceCreate;
