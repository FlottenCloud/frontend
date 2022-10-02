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
    id: 3,
    title: "CONSOLE",
    url: "/console",
    query: {},
  },
  {
    id: 4,
    title: "PROFILE",
    url: "/profile",
    query: {},
  },
  {
    id: 5,
    title: "ERROR",
    url: "/error",
    query: {},
  },
];
