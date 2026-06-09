'use server'

import { createClient } from "@/supabase/supabaseServer"

export const  getUserWorkSpaceData = async (workspaceIds: Array<string>) => {
    const supabase = await createClient()

    const {data, error} = await  supabase.from('workspaces').select('*').in('id', workspaceIds)

    return [data, error]
}


export const getCurrentWorkspaceData = async (workspaceId: string) => {
    const supabase = await createClient()

    const {data, error} = await supabase.from('workspaces').select('*').eq('id', workspaceId).single();

    return [data, error]
}