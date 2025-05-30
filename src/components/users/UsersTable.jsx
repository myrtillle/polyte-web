import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Eye, Edit, Trash2 } from "lucide-react";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UsersTable = ({ users, onRefresh }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // "view" | "edit" | "delete"
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // reset pagination
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const handleSort = (key) => {
	setSortConfig((prev) => {
	  if (prev.key === key) {
		return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
	  }
	  return { key, direction: "asc" };
	});
  };
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
	if (!sortConfig.key) return 0;
  
	const aVal = a[sortConfig.key]?.toString().toLowerCase();
	const bVal = b[sortConfig.key]?.toString().toLowerCase();
  
	if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
	if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
	return 0;
  });
  
  const startIdx = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIdx, startIdx + usersPerPage);

  const openModal = (type, user) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-dark-gray">Users List</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 rounded bg-gray-800 text-white border border-gray-700"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-green-700">
        <table className="min-w-full bg-transparent text-green-50">
          <thead className="bg-green-800/70 text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort("first_name")}>
				Name {sortConfig.key === "first_name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
			  </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort("email")}>
				Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "↑" : "↓")}
			  </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort("purok")}>
				Purok {sortConfig.key === "purok" && (sortConfig.direction === "asc" ? "↑" : "↓")}
			  </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort("created_at")}>
				Joined {sortConfig.key === "created_at" && (sortConfig.direction === "asc" ? "↑" : "↓")}
			  </th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  No users found.
                </td>
              </tr>
            ) : (
			  sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-green-900/30 transition">
                  <td className="py-3 px-6">{user.first_name} {user.last_name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">{user.purok || "—"}</td>
                  <td className="py-3 px-6">{format(new Date(user.created_at), "PP")}</td>
                  <td className="py-3 px-6">
                    <span className="inline-block px-3 py-1 text-xs bg-green-600 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-6 flex">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => openModal("view", user)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                    {/* <button onClick={() => openModal("edit", user)} className="text-yellow-400 hover:text-yellow-300">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => openModal("delete", user)} className="text-red-500 hover:text-red-400">
                      <Trash2 size={18} />
                    </button> */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 text-sm text-white gap-2">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-green-700 font-bold" : "bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      {modalType === "view" && selectedUser && (
        <ViewUserModal user={selectedUser} onClose={closeModal} />
      )}
      {modalType === "edit" && selectedUser && (
		<EditUserModal user={selectedUser} onClose={closeModal} onRefresh={onRefresh} />
	  )}
      {modalType === "delete" && selectedUser && (
	    <DeleteUserModal user={selectedUser} onClose={closeModal} onRefresh={onRefresh} />
	  )}
    </>
  );
};

export default UsersTable;
