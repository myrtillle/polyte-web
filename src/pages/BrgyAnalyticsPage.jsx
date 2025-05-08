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


  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const plastics = await analyticsService.fetchTotalPlastics();
        const lastMonth = await analyticsService.fetchLastMonthPlastics();
        const users = await analyticsService.fetchActiveUsers();
        const claims = await analyticsService.fetchTotalClaims();
        const monthly = await analyticsService.fetchMonthlyPlastics();
        const modes = await analyticsService.fetchCollectionModeDistribution();
        const topUsersData = await analyticsService.fetchTopUsersCollected();
        const topPuroksData = await analyticsService.fetchTopPuroksCollected();
        const postCategoriesData = await analyticsService.fetchPostCategoryDistribution();

        setTotalPlastics(plastics);
        setLastMonthPlastics(lastMonth);
        setActiveUsers(users);
        setTotalClaims(claims);
        setMonthlyPlastics(monthly);
        setCollectionModes(modes);
        setTopUsers(topUsersData);
        setTopPuroks(topPuroksData);
        setPostCategories(postCategoriesData);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchAnalytics();
  }, []);

  // Only plasticsChange is calculated for now
  const plasticsChange = lastMonthPlastics > 0
    ? ((totalPlastics - lastMonthPlastics) / lastMonthPlastics) * 100
    : 0;

    return (
        <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
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
              <MonthlyPlastics monthlyPlastics={monthlyPlastics} />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Collection Mode Pie Chart */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CollectionMode collectionModes={collectionModes} />
            </motion.div>
            
            {/* Post Category Distribution */}
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PostCategory postCategories={postCategories} />
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
              <TopPuroks topPuroks={topPuroks} />
            </motion.div>
              {/* Top Users Bar Chart */}
              <motion.div
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0. }}
              >
                <TopUsers topUsers={topUsers} />
              </motion.div>
            </div>

          </main>
        </div>
      );
};

export default BrgyAnalyticsPage;
