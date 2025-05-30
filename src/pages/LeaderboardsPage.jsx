import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { analyticsService } from "../services/analyticsService";
import UserLeaderboard from "../components/leaderboards/UserLeaderboard";
import PurokLeaderboard from "../components/leaderboards/PurokLeaderboard";

const LeaderboardsPage = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [topPuroks, setTopPuroks] = useState([]);
  const [topUsersByPolys, setTopUsersByPolys] = useState([]);
  const [topPuroksByPolys, setTopPuroksByPolys] = useState([]);
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
        const topPuroksData = await analyticsService.fetchTopPuroksCollected(selectedTimeRange);
        const topUsersPolysData = await analyticsService.fetchTopUsersByPolys(dateFrom, dateTo);
        const topPuroksPoly = await analyticsService.fetchTopPuroksByPolys(selectedTimeRange);

        setTopUsers(topUsersData);
        setTopPuroks(topPuroksData);
        setTopUsersByPolys(topUsersPolysData);
        setTopPuroksByPolys(topPuroksPoly)
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, [selectedTimeRange, selectedLeaderboard, selectedMetric]);

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-white text-gray-800">
      <main className="max-w-5xl mx-auto py-8 px-4 lg:px-8 space-y-8">
        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Barangay Leaderboards 🏆
        </motion.h1>

        {/* Dropdowns */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          <select
            className="bg-green-100 text-green-900 text-sm py-2 px-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedLeaderboard}
            onChange={(e) => setSelectedLeaderboard(e.target.value)}
          >
            <option value="users">Top Users</option>
            <option value="puroks">Top Puroks</option>
          </select>

          <select
            className="bg-green-100 text-green-900 text-sm py-2 px-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="plastics">Plastics Collected</option>
            <option value="polys">Poly Points</option>
          </select>

          <select
            className="bg-green-100 text-green-900 text-sm py-2 px-4 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
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

          {selectedLeaderboard === 'puroks' && selectedMetric === 'polys' && (
            <PurokLeaderboard topPuroks={topPuroksByPolys} showPolys />
          )}
        </div>
      </main>
    </div>
  );
};

export default LeaderboardsPage;
