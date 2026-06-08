import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";

export const createWorkspace = async ({imageUrl, name, slug, invite_code}: {
    imageUrl?: string;
    name: string;
    slug: string;
    invite_code: string;
}) => {
  const supabase = await createClient()
  const userData = await getUserData()
  if (!userData) {
    return {error: 'No user data'}
  }

  const {} = await supabase.from('workspace').insert({
    image_url: imageUrl,
    name,
    super_admin: userData.id,
    slug,
    invite_code
  }).select('*')
}