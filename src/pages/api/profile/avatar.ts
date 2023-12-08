import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const GET: APIRoute = async () => {
  const { data, error } = await supabase.storage.from('avatars').download('avatar1.png')

  if (error) {
    return new Response(null, { status: 500 })
  }

  return new Response(await data.arrayBuffer(), {
    headers: { 'Content-Type': 'image/png' },
  })
}
