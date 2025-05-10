import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      if (!data.session) {
        navigate("/login");
      }
    };

    getSession();
  }, []);

  if (loading) return <p className="text-white text-center mt-20">Checking access...</p>;

  return session ? children : null;
};

export default ProtectedRoute;
