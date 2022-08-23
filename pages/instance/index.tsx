import { MenuItem, Select } from "@mui/material";
import DefaultLayout from "layout/DefaultLayout";
import { useState } from "react";

const Instance = () => {
  const [value, setValue] = useState<Array<any>>([]);

  return (
    <DefaultLayout>
      Instance
      <Select
        value={value}
        onChange={(e) => {
          setValue((prev) => {
            const prevArray = [...prev];
            prev.push(e.target.value);
            return prevArray;
          });
        }}
        multiple
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={40}>40</MenuItem>
      </Select>
    </DefaultLayout>
  );
};

export default Instance;
