import { useState } from "react";
import { userService } from "../../services/userService";

const EditUserModal = ({ user, onRefresh, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    purok: user.purok || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(user.id, formData);
      alert("User updated successfully.");

      await userService.updateUser(user.id, formData);
      await onRefresh();
      onClose();

      onClose();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>

        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" className="mb-2 w-full px-3 py-2 border rounded" />
        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" className="mb-2 w-full px-3 py-2 border rounded" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="mb-2 w-full px-3 py-2 border rounded" />
        <input name="purok" value={formData.purok} onChange={handleChange} placeholder="Purok" className="mb-4 w-full px-3 py-2 border rounded" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
