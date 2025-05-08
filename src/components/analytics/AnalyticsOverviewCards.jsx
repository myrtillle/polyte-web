import { motion } from 'framer-motion';
import { DollarSign, Users, Package, Eye } from 'lucide-react';

const icons = {
  Plastics: DollarSign,
  Users: Users,
  Claims: Package,
  Views: Eye,
};

const AnalyticsOverviewCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-6">
      {stats.map((stat, idx) => {
        const Icon = icons[stat.icon] || DollarSign;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-xl bg-gray-800 bg-opacity-50 backdrop-blur-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-sm font-medium text-gray-400">{stat.name}</h2>
                <p className="text-2xl font-semibold text-gray-100">{stat.value}</p>
              </div>
              <div className="rounded-full bg-green-700 p-3">
                <Icon className="text-white w-5 h-5" />
              </div>
            </div>
            <p className={`text-sm font-medium ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {stat.change >= 0 ? `▲ ${stat.change}% increase` : `▼ ${Math.abs(stat.change)}% decrease`}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnalyticsOverviewCards;
