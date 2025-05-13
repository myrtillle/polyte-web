import { motion } from "framer-motion";
import { Pencil, Trash2, Gift } from "lucide-react";

const RewardCard = ({ reward, onEdit, onDelete, redeemCount  }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative bg-green-200 shadow-md rounded-lg p-4 mb-4"
    >
       <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={() => onEdit(reward)} className="text-blue-500 hover:text-blue-700">
          <Pencil size={18} />
        </button>
        <button onClick={() => onDelete(reward.id)} className="text-red-500 hover:text-red-700">
          <Trash2 size={18} />
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          {reward.reward_types?.type_name?.toUpperCase()}
        </h3>
        <p className="text-gray-700 mb-2">{reward.reward_name}</p>
        <p className="text-gray-600 text-sm">{reward.reward_description}</p>
        <p className="text-green-700 font-bold mt-2">{reward.poly_points_required} polys</p>
      </div>

      {/* Claimed Counter */}
      <div className="absolute bottom-3 right-4 text-xs text-green-800 font-semibold">
        {redeemCount} {redeemCount === 1 ? "redeem" : "redeems"}
      </div>
    </motion.div>
  );
};

export default RewardCard;