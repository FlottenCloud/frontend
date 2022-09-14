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
    title: "PROFILE",
    url: "/profile",
    query: {},
  },
];
