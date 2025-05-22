import { rewardsService } from '../../services/rewardsService';
import { supabase } from '../../services/supabaseClient';

const ClaimedRewardsTable = ({ claimedRewards, onApprove, onReject }) => {
  const handleApprove = async (id) => {
    try {
      await rewardsService.approveClaimedReward(id);
      await supabase.from('notifications').insert({
        user_id: userId, // The user to notify
        title: 'Reward Claim Approved',
        message: 'Your reward claim has been approved!',
        is_read: false,
        created_at: new Date().toISOString(),
        type: 'claim_approved',
        target_type: 'claimed_reward',
        target_id: id,
      });
      onApprove(id);
    } catch (error) {
      console.error('Error approving reward:', error);
      // You might want to show an error message to the user here
    }
  };

  const handleReject = async (id) => {
    try {
      await rewardsService.rejectClaimedReward(id);
      onReject(id);
    } catch (error) {
      console.error('Error rejecting reward:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-green-700 mt-4">
      <table className="min-w-full bg-transparent text-green-900">
        <thead className="bg-green-200">
          <tr>
            <th className="py-3 px-6 border-b text-left">Reward Name</th>
            <th className="py-3 px-6 border-b text-left">Status</th>
            <th className="py-3 px-6 border-b text-left">Claimed At</th>
            <th className="py-3 px-6 border-b text-left">Approved At</th>
            <th className="py-3 px-6 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claimedRewards.map((claim) => (
            <tr key={claim.id} className="hover:bg-green-100">
              <td className="py-3 px-6 border-b">{claim.rewards?.reward_name || "Unknown"}</td>
              <td className="py-3 px-6 border-b capitalize">{claim.status}</td>
              <td className="py-3 px-6 border-b">{new Date(claim.claimed_at).toLocaleString()}</td>
              <td className="py-3 px-6 border-b">
                {claim.approved_at ? new Date(claim.approved_at).toLocaleString() : "-"}
              </td>
              <td className="py-3 px-6 border-b">
                {claim.status === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(claim.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(claim.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimedRewardsTable;
  