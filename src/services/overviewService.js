import { supabase } from "./supabaseClient";

export const overviewService = {
  async fetchStats() {
    const { data: sackData, error: sackError } = await supabase
      .from("offer_schedules")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed");

    const { data: users, error: userError } = await supabase
      .from("personal_users")
      .select("id", { count: "exact", head: true });

    const { data: transfers, error: transError } = await supabase
      .from("claimed_rewards")
      .select("id", { count: "exact", head: true });

    return {
      totalSacks: sackData?.count || 0,
      totalUsers: users?.count || 0,
      totalTransfers: transfers?.count || 0,
      successRate: "87.54%", // placeholder
    };
  },

  async fetchMonthlyOverview() {
    const { data, error } = await supabase.rpc("get_monthly_plastics_collected");
    if (error) throw error;

    if (!data) return [];

    return data.map((item) => ({
        name: (item.month_name || item.month || "Unknown").toString().slice(0, 3),
        sales: item.total_kg || 0,
      }));      
  },

  async fetchPlasticTypeDistribution() {
    const { data, error } = await supabase.from("offers").select("offered_items");

    if (error) throw error;
    if (!data) return [];

    const typeCount = {};
    
    data.forEach((offer) => {
      (offer.offered_items || []).forEach((type) => {
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });
    
    return Object.entries(typeCount).map(([name, value]) => ({ name, value }));
  },

  async fetchSacksPerPurok() {
    const { data, error } = await supabase.rpc("get_top_puroks_collected");
    if (error) throw error;
  
    return data.map((row) => ({
      name: row.purok,
      value: row.total_plastics,
    }));
  },
};
