import { supabase } from './supabaseClient';

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

  //total plastic kg collected per month
  async fetchMonthlyPlastics() {
    const { data, error } = await supabase
      .rpc('get_monthly_plastics_collected');

    if (error) throw error;
    return data || [];
  },

  async fetchLastMonthPlastics() {
    const { data, error } = await supabase
      .rpc('get_last_month_plastics_collected');
  
    if (error) throw error;
    return data?.total_plastics || 0;
  },

  async fetchCollectionModeDistribution() {
    const { data, error } = await supabase
      .rpc('get_collection_mode_distribution');
  
    if (error) throw error;
    return data || [];
  },
  
  async fetchTopPuroksCollected() {
    const { data, error } = await supabase
      .rpc('get_top_puroks_collected');
  
    if (error) throw error;
    return data || [];
  },

  async fetchTopUsersCollected() {
    const { data, error } = await supabase
      .rpc('get_top_users_collected');
    if (error) throw error;
    return data || [];
  },
  
  async fetchPostCategoryDistribution() {
    const { data, error } = await supabase
      .rpc('get_post_category_distribution');
  
    if (error) throw error;
    return data || [];
  },

  async fetchTopUsersByPolys() {
    const { data, error } = await supabase
      .rpc('get_top_users_polypoints');
  
    if (error) throw error;
    return data || [];
  }
  
  
};
