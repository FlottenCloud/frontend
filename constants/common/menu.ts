import DashboardIcon from "@mui/icons-material/Dashboard";
import InstanceIcon from "@mui/icons-material/Cloud";
import ConsoleIcon from "@mui/icons-material/Computer";
import ProfileIcon from "@mui/icons-material/Info";

interface menu {
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly query: Object;
}

export const MENU: Array<menu> = [
  {
    id: 0,
    title: "DASHBOARD",
    url: "/dashboard",
    query: {},
  },
  {
    id: 1,
    title: "INSTANCE",
    url: "/instance",
    query: {},
  },
  {
    id: 2,
    title: "CONSOLE",
    url: "/console",
    query: {},
  },
  {
    id: 3,
    title: "PROFILE",
    url: "/profile",
    query: {},
  },
  {
    id: 4,
    title: "ERROR",
    url: "/error",
    query: {},
  },
];
