import { useEffect, useState } from "react";
import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { settingsService } from "../../services/settingsService";
import { supabase } from "../../services/supabaseClient";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) return;

      setUserId(user.id);

      const data = await settingsService.fetchBarangayUser(user.id);
      setUserData(data);

      setForm({
        contact_name: data.contact_name,
        email: data.email,
        // We don't update barangay name from user table — just display from joined barangays.name
      });
    };

    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      await settingsService.updateBarangayProfile(userId, form);
      setUserData((prev) => ({ ...prev, ...form }));
      setShowForm(false);
      alert("Profile updated successfully.");
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  };

  const handleAvatarChange = async (e) => {
	const file = e.target.files?.[0];
	if (!file) return;
  
	// ✅ Check if user is authenticated
	const {
	  data: { user },
	} = await supabase.auth.getUser();
	console.log("🧑 Logged in user:", user?.id);
  
	const userId = user?.id;
	if (!userId) {
	  alert("You're not logged in.");
	  return;
	}
  
	try {
	  const publicUrl = await settingsService.uploadAvatar(file, userId);
	  await settingsService.updateAvatarUrl(userId, publicUrl);
  
	  setUserData((prev) => ({
		...prev,
		profile_photo_url: publicUrl,
	  }));
  
	  alert("✅ Avatar updated!");
	} catch (err) {
	  console.error("❌ Upload failed:", err.message);
	  alert("Failed to upload avatar.");
	}
  };
  
  
  return (
    <SettingSection icon={User} title={"Profile"}>
      <div className='flex flex-col sm:flex-row items-center mb-6 gap-4'>
  <label className="relative cursor-pointer group">
    <img
      src={userData?.profile_photo_url || "/assets/profile-placeholder.png"}
      alt="Profile"
      className="rounded-full w-24 h-24 object-cover border border-gray-300"
    />
    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition">
      Change
    </div>
    <input
      type="file"
      accept="image/*"
      className="absolute inset-0 opacity-0 cursor-pointer"
      onChange={handleAvatarChange}
    />
  </label>

  <div>
    <h3 className='text-xl font-semibold text-gray-800'>
      {userData?.barangays?.name}
    </h3>
    <p className='text-gray-600'>{userData?.email}</p>
    <p className='text-gray-600'>Contact: {userData?.contact_name}</p>
    <p className='text-gray-500 text-sm'>
      Joined:{" "}
      {userData?.created_at &&
        new Date(userData.created_at).toLocaleDateString()}
    </p>
  </div>
</div>


      <button
  className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition w-full sm:w-auto'
  onClick={() => setShowForm(true)}
>
  Edit Profile
</button>


      {showForm && (
  <div className='mt-6 space-y-4'>
    <input
      type='text'
      value={form.contact_name}
      onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
      className='w-full border border-gray-300 text-gray-800 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
      placeholder='Contact Person'
    />
    <input
      type='email'
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      className='w-full border border-gray-300 text-gray-800 bg-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400'
      placeholder='Email'
    />
    <div className='flex gap-2'>
      <button
        onClick={handleUpdate}
        className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold'
      >
        Save
      </button>
      <button
        onClick={() => setShowForm(false)}
        className='text-gray-500 underline'
      >
        Cancel
      </button>
    </div>
  </div>
)}
    </SettingSection>
  );
};

export default Profile;
