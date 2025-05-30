import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { Plus, Star, Award, Trophy } from "lucide-react";
import RewardCard from "../components/rewards/RewardCard";
import AddRewardModal from "../components/rewards/AddRewardModal";
import EditRewardModal from "../components/rewards/EditRewardModal";
import { rewardsService } from "../services/rewardsService";
import ClaimedRewardsTable from "../components/rewards/ClaimedRewardsTable";

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const [activeTab, setActiveTab] = useState("rewards");
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [rewardTypes, setRewardTypes] = useState([]);
  const [newRewardType, setNewRewardType] = useState("");

  const fetchRewards = async () => {
    try {
      const data = await rewardsService.fetchRewards();
      setRewards(data);
    } catch (error) {
      console.error("Failed to fetch rewards:", error);
    }
  };

  const fetchRewardTypes = async () => {
    try {
      const data = await rewardsService.fetchRewardTypes();
      setRewardTypes(data);
    } catch (error) {
      console.error("Failed to fetch reward types:", error);
    }
  };

  useEffect(() => {
    fetchRewards();
    fetchRewardTypes();
  }, []);

  //
  //            REWARDS            //
  //
  const handleSaveReward = async (rewardData) => {
	try {
	  console.log('Reward data before saving:', rewardData); // 👈 add this!
  
	  await rewardsService.createReward({
		...rewardData,
		barangay_id: '9cec46ba-c774-476e-ba03-d0fe0e086c79'
	  });
  
	  fetchRewards();
	} catch (error) {
	  console.error("Failed to create reward:", error);
	}
  };

  const handleDeleteReward = async (id) => {
    try {
      await rewardsService.deleteReward(id);
      fetchRewards();
    } catch (error) {
      console.error("Failed to delete reward:", error);
    }
  };

  const handleEditReward = (reward) => {
    setCurrentReward(reward);
    setEditModalOpen(true);
  };
  
  const handleUpdateReward = async (updatedData) => {
    try {
      await rewardsService.updateReward(currentReward.id, updatedData);
      fetchRewards();
      console.log("update success.")
    } catch (error) {
      console.error("Failed to update reward:", error);
    }
  };

  //
  //            CLAIMS            //
  //
  const fetchClaimedRewards = async () => {
    try {
      const data = await rewardsService.fetchClaimedRewards();
      setClaimedRewards(data);
    } catch (error) {
      console.error("Failed to fetch claimed rewards:", error);
    }
  };
  
  const handleClaimReward = async (reward) => {
    try {
      await rewardsService.createClaimedReward({
        reward_id: reward.id,
        barangay_id: reward.barangay_id,
        status: 'pending',
        claimed_at: new Date().toISOString(),
      });
  
      alert('Reward claimed successfully!');
      fetchClaimedRewards(); // refetch claims after adding
    } catch (error) {
      console.error("Failed to claim reward:", error);
    }
  };
  
  const approveClaim = async (claimId) => {
    try {
      await rewardsService.approveClaimedReward(claimId);
      fetchClaimedRewards(); // refetch claims
    } catch (error) {
      console.error("Failed to approve claim:", error);
    }
  };
  
  const rejectClaim = async (claimId) => {
    try {
      await rewardsService.rejectClaimedReward(claimId);
      fetchClaimedRewards(); // refetch claims
    } catch (error) {
      console.error("Failed to reject claim:", error);
    }
  };
  
  useEffect(() => {
    fetchClaimedRewards();
  }, []);

  const handleAddRewardType = async () => {
    if (!newRewardType.trim()) return;
    
    try {
      await rewardsService.createRewardType(newRewardType.trim());
      setNewRewardType("");
      fetchRewardTypes();
    } catch (error) {
      console.error("Failed to add reward type:", error);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Barangay Rewards Management" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Total Rewards" icon={Star} value={rewards.length} color="#6366F1" />
          <StatCard
            name="Most Expensive"
            icon={Trophy}
            value={
              rewards.length > 0
                ? `${Math.max(...rewards.map((r) => r.poly_points_required))} polys`
                : "0 polys"
            }
            color="#F59E0B"
          />
          <StatCard
            name="Cheapest Reward"
            icon={Award}
            value={
              rewards.length > 0
                ? `${Math.min(...rewards.map((r) => r.poly_points_required))} polys`
                : "0 polys"
            }
            color="#10B981"
          />
        </motion.div>
        
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setAddModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-center"
          >
            + Add Reward
          </button>

          {/* <div className="flex gap-2">
            <input
              type="text"
              value={newRewardType}
              onChange={(e) => setNewRewardType(e.target.value)}
              placeholder="New reward type"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddRewardType}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Add Type
            </button>
          </div> */}
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 flex flex-col gap-4">
            <button
              onClick={() => setActiveTab("rewards")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition text-left ${
                activeTab === "rewards"
                  ? "bg-green-700 text-white"
                  : "bg-green-100 text-green-900"
              }`}
            >
              Rewards
            </button>
            <button
              onClick={() => setActiveTab("claims")}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition text-left ${
                activeTab === "claims"
                  ? "bg-green-700 text-white"
                  : "bg-green-100 text-green-900"
              }`}
            >
              Claims
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 ml-8">
            {activeTab === "rewards" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <RewardCard
                    key={reward.id}
                    reward={reward}
                    onEdit={handleEditReward}
                    onDelete={handleDeleteReward}
                    onClaim={handleClaimReward}
                    redeemCount={reward.claimed_count || 0}
                  />
                ))}
              </div>
            )}

            {activeTab === "claims" && (
              <ClaimedRewardsTable
                claimedRewards={claimedRewards}
                onApprove={approveClaim}
                onReject={rejectClaim}
              />
            )}
          </div>
        </div>
      </main>

      <AddRewardModal 
        isOpen={addModalOpen} 
        onClose={() => setAddModalOpen(false)} 
        onSave={handleSaveReward}
        rewardTypes={rewardTypes}
      />

      <EditRewardModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleUpdateReward}
        initialReward={currentReward}
        rewardTypes={rewardTypes}
      />
    </div>
  );
};

export default RewardsPage;