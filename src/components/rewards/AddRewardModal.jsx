import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient.js"; // adjust path if needed

const AddRewardModal = ({ isOpen, onClose, onSave }) => {
  const [rewardTypes, setRewardTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [rewardName, setRewardName] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [polyPointsRequired, setPolyPointsRequired] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchRewardTypes();
    }
  }, [isOpen]);

  const fetchRewardTypes = async () => {
    const { data, error } = await supabase
      .from('reward_types')
      .select('*')
      .order('type_name', { ascending: true });

    if (error) {
      console.error("Failed to fetch reward types:", error);
    } else {
      setRewardTypes(data);
      if (data.length > 0) setSelectedTypeId(data[0].id); // Default select first
    }
  };

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedTypeId) return alert("Please select a reward type.");

    onSave({
      reward_type_id: selectedTypeId,
      reward_name: rewardName,
      reward_description: rewardDescription,
      poly_points_required: parseInt(polyPointsRequired),
    });
    onClose();
    setRewardName("");
    setRewardDescription("");
    setPolyPointsRequired("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Reward</h2>

        <label className="block text-sm font-medium mb-1">Reward Type</label>
        <select
          value={selectedTypeId}
          onChange={(e) => setSelectedTypeId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          {rewardTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.type_name}</option>
          ))}
        </select>

        <label className="block text-sm font-medium mb-1">Reward Name</label>
        <input
          type="text"
          value={rewardName}
          onChange={(e) => setRewardName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Ex: P50 Load"
        />

        <label className="block text-sm font-medium mb-1">Reward Description</label>
        <input
          type="text"
          value={rewardDescription}
          onChange={(e) => setRewardDescription(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Short description"
        />

        <label className="block text-sm font-medium mb-1">Poly Points Required</label>
        <input
          type="number"
          value={polyPointsRequired}
          onChange={(e) => setPolyPointsRequired(e.target.value)}
          className="w-full border p-2 rounded mb-6"
          placeholder="Ex: 500"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Cancel</button>
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddRewardModal;