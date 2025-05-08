import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TopUsers = ({ topUsers }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Top Users by Plastics Donated</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={topUsers.slice(0,5)} >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <YAxis type="number" stroke="#9CA3AF" />
            <XAxis dataKey="user_name" type="category" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.9)", borderColor: "#4B5563" }}
              formatter={(value, name, props) => [
                `${value} KG`, 
                `${props.payload.user_name} (${props.payload.purok_name})`
              ]}
            />
            <Bar dataKey="total_plastics" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TopUsers;
