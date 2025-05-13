import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analyticsService } from "../services/analyticsService";
import AnalyticsOverviewCards from "../components/analytics/AnalyticsOverviewCards";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import CollectionMode from "../components/analytics/CollectionMode";
import MonthlyPlastics from "../components/analytics/MonthlyPlastics";
import TopPuroks from "../components/analytics/TopPuroks";
import TopUsers from "../components/analytics/TopUsers";
import PostCategory from "../components/analytics/PostCategory";

const BrgyAnalyticsPage = () => {
  const [totalPlastics, setTotalPlastics] = useState(0);
  const [lastMonthPlastics, setLastMonthPlastics] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);
  const [monthlyPlastics, setMonthlyPlastics] = useState([]);
  const [collectionModes, setCollectionModes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [topPuroks, setTopPuroks] = useState([]);
  const [postCategories, setPostCategories] = useState([]);

  // date range
  const [plasticsRange, setPlasticsRange] = useState("month");
  const [collectionRange, setCollectionRange] = useState("month");
  const [usersRange, setUsersRange] = useState("month");
  const [puroksRange, setPuroksRange] = useState("month");
  const [categoriesRange, setCategoriesRange] = useState("month");
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        console.log("📦 Fetching Analytics:");
        
        const plastics = await analyticsService.fetchTotalPlastics();
        const lastMonth = await analyticsService.fetchLastMonthPlastics();
        const users = await analyticsService.fetchActiveUsers();
        const claims = await analyticsService.fetchTotalClaims();
  
        console.log("📈 MonthlyPlastics →", plasticsRange);
        const monthly = await analyticsService.fetchMonthlyPlastics(plasticsRange);
  
        console.log("🥡 CollectionMode →", collectionRange);
        const modes = await analyticsService.fetchCollectionModeDistribution(collectionRange);
  
        console.log("🧁 PostCategory →", categoriesRange);
        const postCategoriesData = await analyticsService.fetchPostCategoryDistribution(categoriesRange);
  
        console.log("🏘 TopPuroks →", puroksRange);
        const topPuroksData = await analyticsService.fetchTopPuroksCollected(puroksRange);
  
        console.log("👤 TopUsers →", usersRange);
        const topUsersData = await analyticsService.fetchTopUsersCollected(usersRange);
  
        setTotalPlastics(plastics);
        setLastMonthPlastics(lastMonth);
        setActiveUsers(users);
        setTotalClaims(claims);
        setMonthlyPlastics(monthly);
        setCollectionModes(modes);
        setPostCategories(postCategoriesData);
        setTopPuroks(topPuroksData);
        setTopUsers(topUsersData);
      } catch (error) {
        console.error("❌ Error fetching analytics:", error);
      }
    };
  
    fetchAnalytics();
  }, [plasticsRange, collectionRange, usersRange, puroksRange, categoriesRange]);
  

  // Only plasticsChange is calculated for now
  const plasticsChange = lastMonthPlastics > 0
    ? ((totalPlastics - lastMonthPlastics) / lastMonthPlastics) * 100
    : 0;

    return (
        <div className="flex-1 overflow-auto relative z-10 bg-mainGreen">
          <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 space-y-8">
            {/* Overview Cards */}
            <AnalyticsOverviewCards
              stats={[
                { name: "Plastics Collected", value: `${totalPlastics} KG`, change: plasticsChange },
                { name: "Active Users", value: `${activeUsers}`, change: 0 },
                { name: "Rewards Claimed", value: `${totalClaims}`, change: 0 },
              ]}
            />
    
            {/* Monthly Plastics Area Chart */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <div className="flex justify-end mb-2">
                  <select
                    value={plasticsRange}
                    onChange={(e) => setPlasticsRange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 text-sm rounded border border-gray-600"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <MonthlyPlastics monthlyPlastics={monthlyPlastics} />
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Collection Mode Pie Chart */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <div className="flex justify-end mb-2">
                  <select
                    value={collectionRange}
                    onChange={(e) => setCollectionRange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 text-sm rounded border border-gray-600"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <CollectionMode collectionModes={ collectionModes } />
              </div>
            </motion.div>
            
            {/* Post Category Distribution */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            > 
              <div className="relative">
                <div className="flex justify-end mb-2">
                  <select
                    value={categoriesRange}
                    onChange={(e) => setCategoriesRange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 text-sm rounded border border-gray-600"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <PostCategory postCategories={postCategories} />
              </div>
            </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Puroks Bar Chart */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            > 
              <div className="relative">
                <div className="flex justify-end mb-2">
                  <select
                    value={puroksRange}
                    onChange={(e) => setPuroksRange(e.target.value)}
                    className="bg-gray-800 text-white px-3 py-1 text-sm rounded border border-gray-600"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
                <TopPuroks topPuroks={topPuroks} />
              </div>
            </motion.div>

              {/* Top Users Bar Chart */}
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0. }}
              >
                <div className="relative">
                  <div className="flex justify-end mb-2">
                    <select
                      value={usersRange}
                      onChange={(e) => setUsersRange(e.target.value)}
                      className="bg-gray-800 text-white px-3 py-1 text-sm rounded border border-gray-600"
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <TopUsers topUsers={topUsers} />
                </div>
              </motion.div>
            </div>

          </main>
        </div>
      );
};

export default BrgyAnalyticsPage;
