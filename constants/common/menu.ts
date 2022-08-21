interface menu {
  readonly id: number;
  readonly title: string;
  readonly url: string;
  readonly query: Object;
  readonly icon?: string;
  readonly activeIcon?: string;
}

export const MENU: Array<menu> = [
  {
    id: 0,
    title: "DASHBOARD",
    url: "/dashboard",
    query: { page: 1, size: 20, column: 0, sorted: "DESC" },
    // icon: LICENSE_ICON.src,
    // activeIcon: LICENSE_SELECTED_ICON.src,
  },
  {
    id: 1,
    title: "INSTANCE",
    url: "/instance",
    query: { page: 1, size: 20, column: 0, sorted: "DESC" },

    // icon: DASHBOARD_ICON.src,
    // activeIcon: DASHBOARD_SELECTED_ICON.src,
  },
  {
    id: 2,
    title: "PROFILE",
    url: "/profile",
    query: { page: 1, size: 20, column: 0, sorted: "DESC" },

    // icon: MANAGEMENT_ICON.src,
    // activeIcon: MANAGEMENT_SELECTED_ICON.src,
  },
];
