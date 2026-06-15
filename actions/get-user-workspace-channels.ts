'use server'


import { Channel } from './../types/app';

import { createClient } from "@/supabase/supabaseServer"

export const getUserWorkspaceChannels = async (workspaceId: string, 
    userId: string
) => {
    const supabase = await createClient()

    const {data: workspaceData, error: workspaceError} = await supabase.from('workspaces').select('channels').eq('id', workspaceId).single()

    if(workspaceError){
        console.log(workspaceError)
        return []
    }
  const channelIds = workspaceData.channels;

  if(!channelIds || channelIds.length === 0) {
    console.log('No channels found');
   
    return [];
  }

  const {data: channelsData, error: channelsError} = await supabase.from('channels').select('*').in('id', channelIds)

  if(channelsError) {
    console.error(channelsError)
    return []
  }

  const userWorkspaceChannels = channelsData.filter((channel) => {
    return channel.members.includes(userId)
  })
  return userWorkspaceChannels as Channel[]
}