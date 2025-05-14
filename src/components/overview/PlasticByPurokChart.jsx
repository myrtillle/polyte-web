import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PlasticByPurokChart = ({ data }) => {
  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Plastics Collected by Purok</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderColor: "#D1D5DB",
              color: "#111827",
            }}
            itemStyle={{ color: "#10B981" }}
            labelStyle={{ color: "#4B5563", fontWeight: "500" }}
          />
          <Bar dataKey="value" fill="#4ADE80" />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default PlasticByPurokChart;
