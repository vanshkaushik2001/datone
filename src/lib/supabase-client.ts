import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qkkoyxytaletifmalwwg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kzkETl4L_WlLTHuE0E9y5w_879DQIhh';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
