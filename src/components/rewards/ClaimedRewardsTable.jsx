import { rewardsService } from '../../services/rewardsService';
import { supabase } from '../../services/supabaseClient';
import { useState } from 'react';

const ClaimedRewardsTable = ({ claimedRewards, onApprove, onReject }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState(''); // 'success' or 'error'

  const showFeedbackMessage = (message, type) => {
    setFeedbackMessage(message);
    setFeedbackType(type);
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      setFeedbackMessage('');
      setFeedbackType('');
    }, 3000); // Hide after 3 seconds
  };

  const handleApprove = async (id) => {
    try {
      // Find the claim to get the user_id
      const claimToApprove = claimedRewards.find(claim => claim.id === id);
      const userId = claimToApprove?.personal_users?.id; // Get user ID from fetched data

      await rewardsService.approveClaimedReward(id);

      if (userId) {
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
        console.log('Notification sent for approved claim', id);
      }
      
      showFeedbackMessage('Claim approved successfully!', 'success');
      onApprove(id); // This should trigger refetching in parent
    } catch (error) {
      console.error('Error approving reward:', error);
      showFeedbackMessage('Failed to approve claim.', 'error');
      // You might want to show an error message to the user here
    }
  };

  const handleReject = async (id) => {
    try {
      await rewardsService.rejectClaimedReward(id);
      showFeedbackMessage('Claim rejected successfully!', 'success');
      onReject(id); // This should trigger refetching in parent
    } catch (error) {
      console.error('Error rejecting reward:', error);
      showFeedbackMessage('Failed to reject claim.', 'error');
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-green-700 mt-4">
      {showFeedback && (
        <div className={`p-3 mb-4 rounded text-white ${
          feedbackType === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {feedbackMessage}
        </div>
      )}
      <table className="min-w-full bg-transparent text-green-900">
        <thead className="bg-green-200">
          <tr>
            <th className="py-3 px-6 border-b text-left">Reward Name</th>
            <th className="py-3 px-6 border-b text-left">User First Name</th>
            <th className="py-3 px-6 border-b text-left">User Last Name</th>
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
              <td className="py-3 px-6 border-b">{claim.personal_users?.first_name || "N/A"}</td>
              <td className="py-3 px-6 border-b">{claim.personal_users?.last_name || "N/A"}</td>
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
  