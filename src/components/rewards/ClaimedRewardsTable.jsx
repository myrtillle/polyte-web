const ClaimedRewardsTable = ({ claimedRewards, onApprove, onReject }) => {
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
                        onClick={() => onApprove(claim.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(claim.id)}
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
  