import { motion } from "framer-motion";

const UserLeaderboard = ({ topUsers }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Top Users Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-gray-400 text-sm uppercase">
              <th className="text-left py-2 px-4">#</th>
              <th className="text-left py-2 px-4">User</th>
              <th className="text-left py-2 px-4">Purok</th>
              <th className="text-left py-2 px-4">Plastics (KG)</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.slice(0, 5).map((user, index) => (
              <tr key={index} className="text-gray-100 text-sm hover:bg-gray-700/30">
                <td className="py-2 px-4 font-bold">
                  {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : index + 1 === 3 ? "🥉" : index + 1}
                </td>
                <td className="py-2 px-4">{user.user_name}</td>
                <td className="py-2 px-4">{user.purok_name}</td>
                <td className="py-2 px-4">{user.total_plastics}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserLeaderboard;
