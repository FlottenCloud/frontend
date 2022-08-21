import axios from "axios";
import { ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import Flex from "components/common/Flex";
import { Typography } from "@mui/material";

interface DashboardItemProps {
  used: number;
  total: number;
  title: string;
}

const DashboardItem = ({ used, total, title }: DashboardItemProps) => {
  // const [result, setResult] = useState<Array<any>>([]);
  // const [total, setTotal] = useState<number>(0);

  const usedPercent = Math.round((used / total) * 100);
  const remainderPercent = Math.round((1 - used / total) * 100);

  const labels = ["ram", "none"];

  const options: any = {
    responsive: true,
    cutout: "90%",
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value, context) {
          return "";
        },
      },
    },
  };

  const data: any = {
    labels,
    datasets: [
      {
        label: "count",
        data: [remainderPercent, usedPercent],
        backgroundColor: [
          "rgba(200, 200, 200, 1)",
          used >= total ? "rgba(255, 0, 0, 1)" : "rgba(0, 0, 255, 1)",
        ],
        borderColor: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"],
      },
    ],
  };

  return (
    <Flex
      width={120}
      align="center"
      style={{ position: "relative", height: "100%" }}
    >
      <Typography variant="h6">{title}</Typography>
      <Doughnut options={options} data={data} style={{ marginTop: "10px" }} />
      <Typography
        variant="h5"
        style={{ position: "absolute", top: "46%", left: "41%" }}
      >
        {`${Math.round((used / total) * 100)}%`}
      </Typography>
      <Typography
        variant="h6"
        style={{ marginTop: "10px" }}
      >{`${used}GB / ${total}GB`}</Typography>
    </Flex>
  );
};

export default DashboardItem;
