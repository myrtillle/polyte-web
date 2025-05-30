import { supabase } from './supabaseClient';

function getRangeFilter(range) {
  const now = new Date();
  const from = new Date();

  if (range === "week") from.setDate(now.getDate() - 7);
  else if (range === "month") from.setMonth(now.getMonth() - 1);
  else if (range === "year") from.setFullYear(now.getFullYear() - 1);

  return from.toISOString();
}

export const analyticsService = {

  //total plastic kg collected
  async fetchTotalPlastics() {
    const { data, error } = await supabase
        .rpc('get_total_plastics_collected');
    
    if (error) throw error;
    return data?.total_plastics || 0;
  },
      
  async fetchActiveUsers() {
    const { data, error } = await supabase
      .from('personal_users')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;
    return data?.count || 0;
  },

  async fetchTotalClaims() {
    const { data, error } = await supabase
      .from('claimed_rewards')
      .select('id', { count: 'exact', head: true });

    if (error) throw error;
    return data?.count || 0;
  },

  //CHART 1: total plastic kg collected per month
  async fetchMonthlyPlastics(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    const { data, error } = await supabase
      .from("offer_schedules")
      .select("scheduled_date, offers(offered_weight)")
      .eq("status", "completed")
      .gte("scheduled_date", fromDate);
  
    if (error) throw error;
  
    const grouped = {};
  
    data.forEach((entry) => {
      const weight = entry.offers?.offered_weight || 0;
      const month = new Date(entry.scheduled_date).toLocaleString("default", { month: "short" });
  
      if (!grouped[month]) {
        grouped[month] = { total: 0, dates: [] };
      }
  
      grouped[month].total += weight;
      grouped[month].dates.push(entry.scheduled_date);
    });
  
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const result = Object.entries(grouped)
      .map(([month, info]) => ({
        month,
        plastics: info.total,
        dates: info.dates,
      }))
      .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  
    console.log("📈 Grouped MonthlyPlastics with Dates:", result);
    return result;
  },    

  async fetchLastMonthPlastics() {
    const { data, error } = await supabase
      .rpc('get_last_month_plastics_collected');
  
    if (error) throw error;
    return data?.total_plastics || 0;
  },

  //CHART 2: Collection modea
  async fetchCollectionModeDistribution(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    const { data, error } = await supabase
      .from("posts")
      .select("collection_mode_id, created_at")
      .gte("created_at", fromDate);
  
    if (error) throw error;
  
    const modeMap = {
      1: "Pickup",
      2: "Dropoff",
      3: "Meetup",
    };
  
    const grouped = {};
  
    data.forEach((post) => {
      const mode = modeMap[post.collection_mode_id] || "Unknown";
  
      if (!grouped[mode]) {
        grouped[mode] = { count: 0, dates: [] };
      }
  
      grouped[mode].count += 1;
      grouped[mode].dates.push(post.created_at);
    });
  
    const result = Object.entries(grouped).map(([collection_mode, info]) => ({
      collection_mode,
      total_collections: info.count,
      dates: info.dates,
    }));
  
    console.log("🥡 Grouped CollectionMode with Dates:", result);
    return result;
  },  

  //CHART 4: Top plastic collection by purok
  async fetchTopPuroksCollected(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    const { data, error } = await supabase.rpc("get_top_puroks_collected", {
      from_date: fromDate,
    });
  
    if (error) throw error;
    return data;
  },  
  
  async fetchTopPuroksByPolys(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    const { data, error } = await supabase.rpc("get_top_puroks_polypoints", {
      from_date: fromDate,
    });
  
    if (error) throw error;
    return data;
  },
    
  async fetchTopUsersCollected(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    console.log("👤 Fetching Top Users from:", fromDate);
  
    const { data, error } = await supabase.rpc("get_top_users_collected", { from_date: fromDate });
  
    if (error) throw error;
  
    console.log("👤 TopUsers Fetched:", data?.length, "rows");
    console.log("👤 TopUsers Data:", data);
  
    return data;
  },
  
  async fetchPostCategoryDistribution(dateRange) {
    const fromDate = getRangeFilter(dateRange);
  
    const { data, error } = await supabase
      .from("posts")
      .select("category_id, created_at")
      .gte("created_at", fromDate);
  
    if (error) throw error;
  
    console.log("🧁 Raw PostCategory data:", data);
  
    const categoryMap = {
      1: "Seeking",
      2: "Selling",
    };
  
    const grouped = {};
  
    data.forEach((post) => {
      const category = categoryMap[post.category_id] || "Unknown";
  
      if (!grouped[category]) {
        grouped[category] = { count: 0, dates: [] };
      }
  
      grouped[category].count += 1;
      grouped[category].dates.push(post.created_at);
    });
  
    const result = Object.entries(grouped).map(([category_name, info]) => ({
      category_name,
      total_posts: info.count,
      dates: info.dates,
    }));
  
    console.log("🧁 Grouped PostCategory with Dates:", result);
  
    return result;
  },

  async fetchTopUsersByPolys() {
    const { data, error } = await supabase
      .rpc('get_top_users_polypoints');
  
    if (error) throw error;
    return data || [];
  },
  
};