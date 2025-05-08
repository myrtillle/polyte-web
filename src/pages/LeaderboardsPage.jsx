import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analyticsService } from "../services/analyticsService";
import UserLeaderboard from "../components/leaderboards/UserLeaderboard";
import PurokLeaderboard from "../components/leaderboards/PurokLeaderboard";

const LeaderboardsPage = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [topPuroks, setTopPuroks] = useState([]);
  const [topUsersByPolys, setTopUsersByPolys] = useState([]);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState('users');
  const [selectedMetric, setSelectedMetric] = useState('plastics');
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');

  const getDateRange = (range) => {
    const now = new Date();
    let dateFrom, dateTo = new Date();

    switch (range) {
      case 'today':
        dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        dateFrom = new Date(firstDayOfWeek.setHours(0,0,0,0));
        break;
      case 'month':
        dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        dateFrom = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    return { dateFrom: dateFrom.toISOString(), dateTo: new Date().toISOString() };
  };

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const { dateFrom, dateTo } = getDateRange(selectedTimeRange);

        const topUsersData = await analyticsService.fetchTopUsersCollected(dateFrom, dateTo);
        const topPuroksData = await analyticsService.fetchTopPuroksCollected(dateFrom, dateTo);
        const topUsersPolysData = await analyticsService.fetchTopUsersByPolys(dateFrom, dateTo);

        setTopUsers(topUsersData);
        setTopPuroks(topPuroksData);
        setTopUsersByPolys(topUsersPolysData);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, [selectedTimeRange, selectedLeaderboard, selectedMetric]); // <-- Important: add dependencies!

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <main className="max-w-5xl mx-auto py-8 px-4 lg:px-8 space-y-8">
        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-gray-100 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Barangay Leaderboards 🏆
        </motion.h1>

        {/* Dropdowns */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          <select
            className="bg-gray-800 text-white text-sm py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedLeaderboard}
            onChange={(e) => setSelectedLeaderboard(e.target.value)}
          >
            <option value="users">Top Users</option>
            <option value="puroks">Top Puroks</option>
          </select>

          <select
            className="bg-gray-800 text-white text-sm py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="plastics">Plastics Collected</option>
            <option value="polys">Poly Points</option>
          </select>

          <select
            className="bg-gray-800 text-white text-sm py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-6">
          {selectedLeaderboard === 'users' && selectedMetric === 'plastics' && (
            <UserLeaderboard topUsers={topUsers} />
          )}

          {selectedLeaderboard === 'users' && selectedMetric === 'polys' && (
            <UserLeaderboard topUsers={topUsersByPolys} showPolys />
          )}

          {selectedLeaderboard === 'puroks' && (
            <PurokLeaderboard topPuroks={topPuroks} />
          )}
        </div>
      </main>
    </div>
  );
};

export default LeaderboardsPage;
