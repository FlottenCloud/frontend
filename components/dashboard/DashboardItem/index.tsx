import axios from "axios";
import { ChartData } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import Flex from "components/common/Flex";
import { Typography } from "@mui/material";
import FigureImage from "components/common/FigureImage";

interface DashboardItemProps {
  used: number;
  total: number;
  title: string;
  unit?: string;
}

const DashboardItem = ({ used, total, title, unit }: DashboardItemProps) => {
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
      width={80}
      align="center"
      style={{ position: "relative", height: "100%" }}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Doughnut options={options} data={data} style={{ marginTop: "10px" }} />
      <Typography
        variant="body1"
        style={{ position: "absolute", top: "44%", left: "41%" }}
      >
        {`${Math.round((used / total) * 100)}%`}
      </Typography>
      <Typography variant="body2" style={{ marginTop: "10px" }}>{`${used}${
        unit ?? "GB"
      } / ${total}${unit ?? "GB"}`}</Typography>
    </Flex>
  );
};

export default DashboardItem;
