const ViewUserModal = ({ user, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold mb-4">User Info</h2>
          <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Purok:</strong> {user.purok || "—"}</p>
          <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
  
          <button
            onClick={onClose}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default ViewUserModal;
  