import { supabase } from "./supabaseClient";

export const settingsService = {

  async fetchBarangayUser(userId) {
    // 1. Get profile from barangay_users
    const { data: userData, error: profileError } = await supabase
      .from("barangay_users")
      .select(`
        id,
        contact_name,
        created_at,
        barangays ( name )
      `)
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    // 2. Get email from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw authError;

    return {
      ...userData,
      email: user.email, // merged email from auth
    };
  },

  // ✅ Handle updating profile + optionally email
  async updateBarangayProfile(userId, updates) {
    const { email, ...otherFields } = updates;

    // 1. Update barangay_users table
    const { error: updateError } = await supabase
      .from("barangay_users")
      .update(otherFields)
      .eq("id", userId);

    if (updateError) throw updateError;

    // 2. If email is included and changed, update it in auth
    if (email) {
      const { data: { user } } = await supabase.auth.getUser();

      if (email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({ email });
        if (emailError) throw emailError;
      }
    }
  },

  async uploadAvatar(file, userId) {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const filePath = `${userId}.${fileExt}`;
    
    console.log("file path: ", filePath);
    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file, { upsert: true });
  
    if (uploadError) throw uploadError;
  
    const { data } = supabase.storage
      .from("profile-photos")
      .getPublicUrl(filePath);
  
    return data.publicUrl;
  },
  
  async updateAvatarUrl(userId, avatarUrl) {
    const { error } = await supabase
      .from("barangay_users")
      .update({ profile_photo_url: avatarUrl })
      .eq("id", userId);
  
    if (error) throw error;
  }  
};
