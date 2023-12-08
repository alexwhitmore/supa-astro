import type { APIRoute } from 'astro'
import { supabase } from '../../../lib/supabase'

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const username = formData.get('username')?.toString()
  const website = formData.get('website')?.toString()
  const avatar_url = formData.get('avatar_url')?.toString()

  const { data } = await supabase.auth.getSession()

  const updates = {
    id: data.session?.user.id,
    username,
    website,
    avatar_url,
    updated_at: new Date(),
  }

  const { error } = await supabase.from('profiles').upsert(updates)

  if (error) {
    return new Response(`${error.message}`, { status: 500 })
  }

  return redirect('/account')
}
