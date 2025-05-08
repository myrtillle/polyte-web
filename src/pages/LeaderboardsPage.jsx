import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { analyticsService } from "../services/analyticsService";
import UserLeaderboard from "../components/leaderboards/UserLeaderboard";
import PurokLeaderboard from "../components/leaderboards/PurokLeaderboard";

const LeaderboardsPage = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [topPuroks, setTopPuroks] = useState([]);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState('users');

  useEffect(() => {
    const fetchLeaderboards = async () => {
      try {
        const topUsersData = await analyticsService.fetchTopUsersCollected();
        const topPuroksData = await analyticsService.fetchTopPuroksCollected();

        setTopUsers(topUsersData);
        setTopPuroks(topPuroksData);
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      }
    };

    fetchLeaderboards();
  }, []);

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

        {/* Dropdown Selector */}
        <div className="flex justify-center mb-6">
          <select
            className="bg-gray-800 text-white text-sm py-2 px-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedLeaderboard}
            onChange={(e) => setSelectedLeaderboard(e.target.value)}
          >
            <option value="users">Top Users</option>
            <option value="puroks">Top Puroks</option>
          </select>
        </div>

        {/* Conditionally Render Leaderboards */}
        <div className="space-y-6">
          {selectedLeaderboard === 'users' && (
            <UserLeaderboard topUsers={topUsers} />
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
