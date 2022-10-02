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
import { useEffect } from "react";
import { io } from "socket.io-client";
import useWebSocket, { ReadyState } from "react-use-websocket";

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

// const socket = io("ws://119.198.160.6:8000/ws/socket-server/", {
//   transports: ["websocket"],
// });

// const initSocketConnection = () => {
//   if (socket) return;
//   socket.connect();
// };

// const disconnectSocket = () => {
//   if (socket == null || socket.connected === false) {
//     return;
//   }
//   socket.disconnect();
// };

function MyApp({ Component, pageProps }: AppProps) {
  const { readyState } = useWebSocket(
    "ws://119.198.160.6:8000/ws/socket-server/",
    {
      onOpen: () => {
        console.log("Connected!");
      },
      onClose: () => {
        console.log("Disconnected!");
      },
      onMessage: (e) => {
        console.log(e);
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
