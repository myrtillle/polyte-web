import { supabase } from "./supabaseClient";

export const userService = {
  async fetchAllUsers() {
    const { data, error } = await supabase
      .from("personal_users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async fetchUserStats() {
    const { count: totalCount, error: totalError } = await supabase
      .from("personal_users")
      .select("*", { count: "exact", head: true });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: newCount, error: newError } = await supabase
      .from("personal_users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today.toISOString());

    if (totalError || newError) throw totalError || newError;

    return {
      totalUsers: totalCount || 0,
      newUsersToday: newCount || 0,
      activeUsers: (totalCount || 0) - 1, // or real logic
      churnRate: "2.3%",
    };
  },

  async updateUser(userId, updates) {
    const { error } = await supabase
      .from("personal_users")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
  },

  async deleteUser(userId) {
    const { error } = await supabase
      .from("personal_users")
      .delete()
      .eq("id", userId);

    if (error) throw error;
  },
};
