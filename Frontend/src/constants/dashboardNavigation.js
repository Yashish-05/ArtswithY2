import { FaHome,FaPaintBrush,FaTrophy,FaImage,FaUser,FaCog, FaSignOutAlt,} from "react-icons/fa";

export const dashboardNavigation = [
  { label: "Dashboard", path: "/dashboard", icon: FaHome },
  { label: "My Artworks", path: "/my-artworks", icon: FaPaintBrush },
  { label: "Challenges", path: "/challenges", icon: FaTrophy },
  { label: "Museum", path: "/museum", icon: FaImage },
  { label: "Profile", path: "/profile", icon: FaUser },
  { label: "Settings", path: "/settings", icon: FaCog },
  { label: "Logout", path: "/logout", icon: FaSignOutAlt },
];