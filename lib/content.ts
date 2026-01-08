export const mainMenu = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Rooms", url: "/rooms" },
  { label: "Contact", url: "/contact" },
  { label: "My Reservation", url: "/my-reservation" },
  { label: "Dashboard", url: "/admin/dashboard" },
  { label: "Manage Room", url: "/admin/manage-room" },
  { label: "Sign In", url: "/signin" },
];

export const baseRoutes = ["/", "/about", "/rooms", "/contact"];

export const publicRoutes = [...baseRoutes, "/signin", "/signup"];
export const userRoutes = [...baseRoutes, "/my-reservation"];
export const adminRoutes = [...baseRoutes, "/admin/dashboard", "/admin/manage-room"];
