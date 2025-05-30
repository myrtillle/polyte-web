import { supabase } from './supabaseClient';

export const rewardsService = {
  async fetchRewards() {
    const { data, error } = await supabase
      .from('rewards')
      .select(`
        *,
        reward_types ( type_name ),
        claimed_rewards ( id )
      `)
      .order('created_at', { ascending: false });
  
    if (error) throw error;
  
    return data.map((reward) => ({
      ...reward,
      claimed_count: reward.claimed_rewards?.length || 0,
    }));
  },  

  async createReward(rewardData) {
    const { data, error } = await supabase
      .from('rewards')
      .insert(rewardData)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async deleteReward(id) {
    const { error } = await supabase
      .from('rewards')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async updateReward(id, updateData) {
    const { data, error } = await supabase
      .from('rewards')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data?.[0];
  },

  async fetchClaimedRewards() {
    const { data, error } = await supabase
      .from('claimed_rewards')
      .select(`
        *,
        rewards (
          reward_name
        ),
        personal_users (
          first_name,
          last_name
        )
      `)
      .order('claimed_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async approveClaimedReward(id) {
    const { data, error } = await supabase
      .from('claimed_rewards')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async rejectClaimedReward(id) {
    const { data, error } = await supabase
      .from('claimed_rewards')
      .update({
        status: 'rejected',
        approved_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async createClaimedReward(claimData) {
    const { data, error } = await supabase
      .from('claimed_rewards')
      .insert(claimData)
      .select();

    if (error) throw error;
    return data?.[0];
  },

  async fetchRewardTypes() {
    const { data, error } = await supabase
      .from('reward_types')
      .select('*')
      .order('type_name', { ascending: true });

    if (error) throw error;
    return data;
  },

  async createRewardType(typeName) {
    const { data, error } = await supabase
      .from('reward_types')
      .insert({ type_name: typeName })
      .select();

    if (error) throw error;
    return data?.[0];
  },
};
