import { CircleDollarSign, Home } from "lucide";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "#",
    icon: () => {
      return <Home />;
    },
  },
  {
    key: "ventas",
    label: "Ventas",
    path: "#",
    icon: () => {
      return <CircleDollarSign />;
    },
  },
];
