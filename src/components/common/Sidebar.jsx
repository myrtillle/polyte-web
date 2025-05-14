import {
  BarChart2,
  CoinsIcon,
  Menu,
  Settings,
  TrendingUp,
  Trophy,
  Users,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "OVERVIEW", icon: BarChart2, color: "#21E344", href: "/overview" },
  { name: "USER", icon: Users, color: "#21E382", href: "/users" },
  { name: "REWARDS", icon: CoinsIcon, color: "#10B981", href: "/rewards" },
  { name: "BARANGAY ANALYTICS", icon: TrendingUp, color: "#0B7C57", href: "/brgy-analytics" },
  { name: "LEADER BOARDS", icon: Trophy, color: "#076656", href: "/leaderboards" },
  { name: "SETTINGS", icon: Settings, color: "#6B7280", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <motion.div
  className={`sticky top-0 h-screen z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
    isSidebarOpen ? "w-64" : "w-20"
  }`}
  animate={{ width: isSidebarOpen ? 256 : 80 }}
>

      {/* Force full height and separate top and bottom */}
      <div className="h-screen bg-white text-gray-900 shadow-md px-4 py-6 flex flex-col justify-between border-r border-gray-200">
        
        {/* Top Section: Collapse, Logo, Menu */}
        <div>
          {/* Collapse + Logo */}
          <div className="flex items-center justify-start mb-8 gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </motion.button>

            <AnimatePresence>
              {isSidebarOpen && (
                <motion.img
                  src="/polyte-logo.png"
                  alt="Logo"
                  className="h-4 object-contain"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Items */}
          <nav className="flex flex-col gap-2">
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className={`flex items-center justify-center md:justify-start gap-4 p-3 text-xs font-medium 
                    hover:bg-gray-100 transition-colors 
                    ${
                      location.pathname === item.href
                        ? "border border-gray-400 rounded-xl bg-white"
                        : ""
                    }`}
                >
                  <item.icon
                    size={22}
                    style={{ color: item.color }}
                    className="min-w-[22px]"
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.1, delay: 0.3 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button - pinned bottom */}
        <div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center md:justify-start gap-4 w-full p-3 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={22} />
            {isSidebarOpen && <span>LOG OUT</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
