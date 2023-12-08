import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const { error } = await supabase.auth.signOut()
  return redirect('/')
}
