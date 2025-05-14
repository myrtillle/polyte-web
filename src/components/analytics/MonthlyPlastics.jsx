import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyPlastics = ({ monthlyPlastics }) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 border border-gray-200 mb-8 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Monthly Plastics Collection
      </h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <AreaChart data={monthlyPlastics}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#D1D5DB",
                color: "#111827",
              }}
              itemStyle={{ color: "#111827" }}
              labelStyle={{ color: "#374151", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="plastics"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MonthlyPlastics;
