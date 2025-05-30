import { supabase } from "./supabaseClient";

export const overviewService = {
  async fetchStats() {
    // Get total sacks collected
    const { count: totalSacks, error: sackError } = await supabase
      .from("offer_schedules")
      .select("*", { count: "exact", head: true })
      .eq("status", "completed");

    if (sackError) throw sackError;

    // Get total users
    const { count: totalUsers, error: userError } = await supabase
      .from("personal_users")
      .select("*", { count: "exact", head: true });

    if (userError) throw userError;

    // Get total transfers (claimed rewards)
    const { count: totalTransfers, error: transError } = await supabase
      .from("claimed_rewards")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved");

    if (transError) throw transError;

    // Calculate success rate based on completed offers vs total offers
    const { count: totalOffers, error: offersError } = await supabase
      .from("offer_schedules")
      .select("*", { count: "exact", head: true });

    if (offersError) throw offersError;

    const successRate = totalOffers > 0 
      ? ((totalSacks / totalOffers) * 100).toFixed(2) + "%"
      : "0%";

    return {
      totalSacks: totalSacks || 0,
      totalUsers: totalUsers || 0,
      totalTransfers: totalTransfers || 0,
      successRate,
    };
  },

  async fetchMonthlyOverview() {
    const { data, error } = await supabase.rpc("get_monthly_plastics_collected");
    if (error) throw error;
  
    if (!data) return [];
  
    return data.map((item) => ({
      month: item.month,        // XAxis expects 'month'
      plastics: item.plastics,  // AreaChart expects 'plastics'
    }));
  },

  async fetchPlasticTypeDistribution() {
    const { data, error } = await supabase
      .from("offers")
      .select("offered_items, offer_schedules!inner(status)")
      .eq("offer_schedules.status", "completed");

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
    const { data, error } = await supabase.rpc("get_purok_totals");
    if (error) throw error;
  
    return data.map((row) => ({
      name: row.purok, // purok_name string
      value: row.total_plastics,
    }));
  }  
};
