import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#A78BFA", "#F87171", "#10B981"];

const PlasticTypeChart = ({ data }) => {
	return (
		<motion.div
		  className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl shadow p-6"
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ delay: 0.1 }}
		>
		  <h3 className="text-lg font-semibold mb-4">Plastic Type Distribution</h3>
		  <ResponsiveContainer width="100%" height={300}>
			<PieChart>
			<Pie
				data={data}
				dataKey="value"
				nameKey="name"
				cx="50%"
				cy="50%"
				outerRadius={100}
				fill="#8884d8"
				label={({ name }) => name}
				labelLine={false}
				>
				{data.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
				))}
				</Pie>
			  <Tooltip />
			</PieChart>
		  </ResponsiveContainer>
		</motion.div>
    );
};

export default PlasticTypeChart;
