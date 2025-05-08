import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const TopPuroks = ({ topPuroks }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Top Puroks by Plastics Collected</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={topPuroks.slice(0,5)} >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <YAxis type="number" stroke="#9CA3AF" />
            <XAxis dataKey="purok" type="category" stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.9)", borderColor: "#4B5563" }}
              formatter={(value, name, props) => [`${value} KG`, `Purok ${props.payload.purok}`]}
            />
            <Bar dataKey="total_plastics" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TopPuroks;
