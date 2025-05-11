const DeleteUserModal = ({ user, onRefresh, onClose }) => {
    const handleDelete = async () => {
        try {
          await userService.deleteUser(user.id);
          alert("User deleted successfully.");
          await userService.deleteUser(user.id);
          await onRefresh();
          onClose();
        } catch (err) {
          alert("Delete failed: " + err.message);
        }
    };
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete</p>
          <p className="font-bold mt-1">{user.first_name} {user.last_name}?</p>
  
          <div className="mt-6 flex justify-center gap-4">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteUserModal;
  