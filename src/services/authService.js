import { supabase } from '../services/supabaseClient';

export const authService = {
    async signupBarangay({ email, password, barangayName, contactName, purokList }) {
        const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
        if (authError) throw new Error(authError.message);

        const userId = authData.user.id;

        const { data: barangay, error: barangayError } = await supabase
            .from('barangays')
            .insert({ name: barangayName })
            .select()
            .single();
        if (barangayError) throw new Error(barangayError.message);

        const barangayId = barangay.id;

        const { error: userError } = await supabase
            .from('barangay_users')
            .insert({ id: userId, barangay_id: barangayId, contact_name: contactName });
        if (userError) throw new Error(userError.message);

        const purokInserts = purokList.map(name => ({ barangay_id: barangayId, purok_name: name }));
        const { error: purokError } = await supabase.from('puroks').insert(purokInserts);
        if (purokError) throw new Error(purokError.message);

        return { userId, barangayId };
    }, 

    async handleSignup(e) {
        e.preventDefault();
      
        const purokList = puroksText
          .split('\n')
          .map(p => p.trim())
          .filter(Boolean);
      
        // 1. Create Supabase Auth account
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
      
        if (authError) {
          alert("Signup failed: " + authError.message);
          return;
        }
      
        const userId = authData.user.id;
      
        // 2. Create barangay
        const { data: barangayInsert, error: barangayError } = await supabase
          .from('barangays')
          .insert({ name: barangayName })
          .select()
          .single();
      
        if (barangayError) {
          alert("Failed to create barangay: " + barangayError.message);
          return;
        }
      
        const barangayId = barangayInsert.id;
      
        // 3. Insert into barangay_users
        const { error: userInsertError } = await supabase
          .from('barangay_users')
          .insert({
            id: userId,
            barangay_id: barangayId,
            contact_name: contactName,
          });
      
        if (userInsertError) {
          alert("Failed to link user: " + userInsertError.message);
          return;
        }
      
        // 4. Insert puroks
        const purokInserts = purokList.map(purok_name => ({
          barangay_id: barangayId,
          purok_name,
        }));
      
        const { error: purokError } = await supabase
          .from('puroks')
          .insert(purokInserts);
      
        if (purokError) {
          alert("Failed to insert puroks: " + purokError.message);
          return;
        }
      
        alert("Signup complete!");
      },

    async handleLogout() {
        await supabase.auth.signOut();
        window.location.href = "/login";
    },
}


  