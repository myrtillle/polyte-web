import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";

const Header = ({ title }) => {
	const [userInfo, setUserInfo] = useState(null);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		window.location.href = "/login";
	};

	useEffect(() => {
		const fetchUserInfo = async () => {
		  const { data: sessionData } = await supabase.auth.getSession();
		  const userId = sessionData?.session?.user?.id;
	
		  if (!userId) return;
	
		  const { data, error } = await supabase
			.from("barangay_users")
			.select("contact_name, barangays(name)")
			.eq("id", userId)
			.single();
	
		  if (!error) setUserInfo(data);
		};
	
		fetchUserInfo();
	  }, []);

	return (
		<header className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700'>
			<div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
				<h1 className='text-2xl font-semibold text-gray-100'>{title}</h1>
				{userInfo && (
					<p className="text-sm text-gray-300">
						{userInfo.contact_name} – {userInfo.barangays.name}
					</p>
				)}	 
			</div>
			<button
				onClick={handleLogout}
				className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
			>
				Logout
			</button>
		</header>
	);
};
export default Header;
