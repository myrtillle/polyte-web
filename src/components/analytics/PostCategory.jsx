import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const PostCategory = ({ postCategories }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Selling vs Seeking Posts</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={postCategories}
              dataKey="total_posts"
              nameKey="category_name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#3B82F6"
              label={({ category_name, percent }) => `${category_name} ${(percent * 100).toFixed(0)}%`}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.9)", borderColor: "#4B5563" }}
              formatter={(value, name) => [`${value} posts`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default PostCategory;
