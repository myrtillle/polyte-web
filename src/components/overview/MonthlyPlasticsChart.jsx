import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const MonthlyPlasticsChart = ({ data }) => {
	const [dateRange, setDateRange] = useState("month");

	const handleChange = (e) => setDateRange(e.target.value);

	return (
		<motion.div
		  className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl shadow p-6"
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.5 }}
		>
		  <h3 className="text-lg font-semibold mb-4">Monthly Plastics Collected</h3>
		  <ResponsiveContainer width="100%" height={300}>	
			<select
				value={dateRange}
				onChange={handleChange}
				className="mb-6 bg-gray-700 text-white px-4 py-2 rounded"
				>
				<option value="week">This Week</option>
				<option value="month">This Month</option>
				<option value="year">This Year</option>
			</select>
			<AreaChart data={data}>
			  <defs>
				<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
				  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
				  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
				</linearGradient>
			  </defs>
			  <XAxis dataKey="name" />
			  <YAxis />
			  <CartesianGrid strokeDasharray="3 3" />
			  <Tooltip />
			  <Area type="monotone" dataKey="sales" stroke="#10B981" fillOpacity={1} fill="url(#colorSales)" />
			</AreaChart>
		  </ResponsiveContainer>
		</motion.div>
	);
};
	

export default MonthlyPlasticsChart;
