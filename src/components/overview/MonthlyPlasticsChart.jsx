import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const MonthlyPlasticsChart = ({ data }) => {
  const [dateRange, setDateRange] = useState("month");

  const handleChange = (e) => setDateRange(e.target.value);

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded-xl p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Plastics Collected</h3>
        {/* <select
          value={dateRange}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 text-sm rounded-md focus:outline-none"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select> */}
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderColor: "#D1D5DB" }}
            labelStyle={{ color: "#374151" }}
            itemStyle={{ color: "#10B981" }}
          />
          <Area
            type="monotone"
            dataKey="plastics"
            stroke="#10B981"
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MonthlyPlasticsChart;
