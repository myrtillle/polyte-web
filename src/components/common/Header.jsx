import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";

const Header = ({ title }) => {
  const [userInfo, setUserInfo] = useState(null);

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
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {userInfo && (
            <p className="text-sm text-gray-600">
              {userInfo.contact_name} – {userInfo.barangays.name}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
