import { useEffect, useState, useRef } from "react";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import MonthlyPlasticsChart from "../components/overview/MonthlyPlasticsChart";
import PlasticTypeChart from "../components/overview/PlasticTypeChart";
import PlasticByPurokChart from "../components/overview/PlasticByPurokChart";
import { overviewService } from "../services/overviewService";

const OverviewPage = () => {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [purokData, setPurokData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const stats = await overviewService.fetchStats();
      const monthly = await overviewService.fetchMonthlyOverview();
      const category = await overviewService.fetchPlasticTypeDistribution();
      const sacks = await overviewService.fetchSacksPerPurok();

      setStats(stats);
      setMonthlyData(monthly);
      setCategoryData(category);
      setPurokData(sacks);
      setLastUpdated(new Date());
    };

    fetchData();
  }, []);

  const handleDownloadImage = () => {
    if (!chartRef.current) return;
    toPng(chartRef.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "overview-chart.png";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-white text-gray-900">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {lastUpdated && (
          <p className="text-sm text-gray-500 text-right mb-2">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}

        {stats && (
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard name="Total Sacks Collected" icon={Zap} value={stats.totalSacks} color="#6366F1" />
            <StatCard name="Total Users" icon={Users} value={stats.totalUsers} color="#8B5CF6" />
            <StatCard name="Total Transfers Done" icon={ShoppingBag} value={stats.totalTransfers} color="#EC4899" />
            <StatCard name="Collection Success Rate" icon={BarChart2} value={stats.successRate} color="#10B981" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div ref={chartRef} className="relative bg-white p-4 rounded-lg shadow text-gray-900">
            <MonthlyPlasticsChart data={monthlyData} />
            <button onClick={handleDownloadImage} className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow">
              ⬇ Export PNG
            </button>
          </div>

          <div ref={chartRef} className="relative bg-white p-4 rounded-lg shadow text-gray-900">
            <PlasticTypeChart data={categoryData} />
            <button onClick={handleDownloadImage} className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow">
              ⬇ Export PNG
            </button>
          </div>

          <div ref={chartRef} className="relative bg-white p-4 rounded-lg shadow text-gray-900">
            <PlasticByPurokChart data={purokData} />
            <button onClick={handleDownloadImage} className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded shadow">
              ⬇ Export PNG
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
