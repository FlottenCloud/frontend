import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useStatusStore from "store/common/server";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const statusStore = useStatusStore();
  const { readyState } = useWebSocket(
    "ws://10.125.70.26:8000/ws/socket-server/",
    {
      onOpen: () => {
        console.log("Connected!");
      },
      onClose: () => {
        console.log("Disconnected!");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        console.log("socket message : ", data.message);
        if (data.type === "server_log") {
          statusStore.setStatus(
            data.message.added_log === "Openstack Server Recovered"
          );
        }
        if (data.type !== "connection_established") {
          if (data.type === "server_log") {
            alert(data.message.added_log);
          }
          if (data.type === "instance_log") {
            alert(data.message.action);
          }
        }
      },
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
