import Flex from "components/common/Flex";
import { Packages } from "hooks/api/instance/useCreateInstance";
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
  Typography,
} from "@mui/material";
import useUpdateInstance, {
  UpdateInstanceParams,
} from "hooks/api/instance/useUpdateInstance";
import { useRouter } from "next/router";
import useReadOneInstance from "hooks/api/instance/useReadOneInstance";
import { ReadOneInstanceResponse } from "types/api/instance/readOneInstance";
import usePostModal from "hooks/common/usePostModal";
import DisableBackground from "components/common/DisableBackground";

interface InstanceUpdateProps {
  id: number;
  close: () => void;
}

const InstanceUpdate = (props: InstanceUpdateProps) => {
  const router = useRouter();
  const updateInstance = useUpdateInstance();
  // const [numPeople, setNumPeople] = useState<number>(0);
  // const [dataSize, setDataSize] = useState<number>(0);
  const [pcSpecs, setPCspecs] = useState<string>();
  const [backupTimes, setBackupTimes] = useState<number>(6);
  const [packages, setPackages] = useState<Array<string>>([]);
  const [disabled, setDisalbed] = useState<Array<string>>([]);

  const id = props.id;

  usePostModal({ mutation: updateInstance });

  useReadOneInstance({
    instance_pk: id,
    successCallback: (res: ReadOneInstanceResponse) => {
      if (res.package !== "") {
        const array = res.package.split(",");
        setPackages(array);
        setDisalbed(array);
      }
      // setNumPeople(+res.num_people);
      // setDataSize(+res.expected_data_size);
      console.log(res);
      setPCspecs(res.pc_spec);
      setBackupTimes(res.backup_time);
    },
  });

  const handleCreateClick = useCallback(
    (e: any) => {
      e.preventDefault();
      const updateParams: UpdateInstanceParams = {
        instance_pk: id,
        // num_people: numPeople,
        // data_size: dataSize,
        pc_spec: pcSpecs,
        backup_time: backupTimes,
        package: packages,
        successCallback: () => router.push({ pathname: "/instance" }),
      };
      updateInstance.mutate(updateParams);
    },
    [id, pcSpecs, backupTimes, packages, updateInstance, router] //numPeople, dataSize,
  );

  return (
    <DisableBackground zIndex={999} onClick={props.close}>
      <Flex
        padding={[20, 20, 20, 20]}
        align="center"
        justify="center"
        style={{ backgroundColor: "white", borderRadius: "8px" }}
      >
        <Flex style={{ marginBottom: "20px" }}>
          <Typography variant="h5">Update Instance</Typography>
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
          {/* <TextField
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
        /> */}
          <FormControl>
            <InputLabel id="pcSpec">PC Spec</InputLabel>
            <Select
              value={pcSpecs}
              label="PC Spec"
              onChange={(e) => setPCspecs(e.target.value)}
            >
              {["low", "middle", "high"].map((item, index) => (
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
      </Flex>
    </DisableBackground>
  );
};

export default InstanceUpdate;
