import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const PlasticByPurokChart = ({ data }) => {
	return (
		<motion.div
		  className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl shadow p-6"
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ delay: 0.2 }}
		>
		  <h3 className="text-lg font-semibold mb-4">Plastics Collected by Purok</h3>
		  <ResponsiveContainer width="100%" height={300}>
			<BarChart data={data}>
			  <CartesianGrid strokeDasharray="3 3" />
			  <XAxis dataKey="name" />
			  <YAxis />
			  <Tooltip />
			  <Bar dataKey="value" fill="#4ADE80" />
			</BarChart>
		  </ResponsiveContainer>
		</motion.div>
	);
};

export default PlasticByPurokChart;



// bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl