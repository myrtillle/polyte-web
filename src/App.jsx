import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { supabase } from "./services/supabaseClient";

// ...your component imports

import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import RewardsPage from "./pages/RewardsPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import BrgyAnalyticsPage from "./pages/BrgyAnalyticsPage";
import LeaderboardsPage from "./pages/LeaderboardsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
	const [session, setSession] = useState(null);

	const location = useLocation();
	const isLogin = location.pathname === "/login";
	const isSignup = location.pathname === "/signup";
	

	useEffect(() => {
		const getSession = async () => {
		  const { data } = await supabase.auth.getSession();
		  setSession(data.session);
		};
		getSession();
	  
		supabase.auth.onAuthStateChange((_event, newSession) => {
		  setSession(newSession);
		});
	}, []);
	  

	return (
		<div
  className={`min-h-screen ${
    isLogin || isSignup
      ? "flex items-center justify-center bg-gradient-to-b from-white to-green-300"
      : "flex bg-white text-gray-900"
  }`}
>



      {/* Only show blur + sidebar if NOT on login */}
      {!(isLogin || isSignup) && (
        <>
          <div className="fixed inset-0 z-0">
            <div className="absolute inset-0" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </div>
          <Sidebar />
        </>
      )}
			<Routes>
			<Route
				path="/"
				element={
					session ? <Navigate to="/overview" /> : <Navigate to="/login" />
				}
			/>	
				<Route path='/login' element={<LoginPage />}/>
				<Route path="/signup" element={< SignupPage />}/>
				<Route path='/overview' element={<ProtectedRoute><OverviewPage /></ProtectedRoute> } />
				{/* <Route path='/products' element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} /> */}
				<Route path='/users' element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
				<Route path='/rewards' element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
				{/* <Route path='/orders' element={<OrdersPage />} /> */}
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
				<Route path='brgy-analytics' element={<ProtectedRoute><BrgyAnalyticsPage /></ProtectedRoute>}/>
				<Route path='leaderboards' element={<ProtectedRoute><LeaderboardsPage /></ProtectedRoute>}/>
			</Routes>
		</div>
	);
}

export default App;
