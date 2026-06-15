'use server'

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";

export const createChannel = async ({workspaceId, name, userId}:{
    workspaceId: string;
    name: string;
    userId: string
}) => {
    const supabase = await createClient()
    const userData = await getUserData();

    if(!userData) {
        return {error: 'No user data'}
    }

    const {error, data: channelRecord} = await supabase
    .from('channels')
    .insert({
        name, 
        user_id: userId,
        workspace_id: workspaceId
    }).select('*');

    if (error) {
        return {
            error: 'Insert Error'
        }
    }

    // update channel members array
    const [, updateChannelMembersError] = await updateChannelMembers(channelRecord[0].id, userId, )
    if(updateChannelMembersError) {
        return {error: 'Update Channel Error'}
    }

    // Add channel to workspace
    const [, updateWorkspaceChannelError] = await updateWorkSpaceChannel(channelRecord[0].id, workspaceId, )
    if(updateWorkspaceChannelError) {
        return {error: 'Add Channel in workspace Error'}
    }

    // Add channel to users channels array
    const [, addChannelToUserError] = await addChannelToUser(channelRecord[0].id, userId)
    if(addChannelToUserError) {
        return {error: 'Add Channel to User Error'}
    }
}

const updateChannelMembers = async (channelId: string, userId: string) => {
    const supabase = await createClient()

    const {data: updateChannelData, error: updateChannelError} = await supabase.rpc('update_channel_members', {
        new_member: userId,
        channel_id: channelId
    });

    return [updateChannelData, updateChannelError]
}

const addChannelToUser = async (channelId: string, userId: string) => {
    const supabase = await createClient()
const {data: addChannelData, error: addChannelError} = await supabase.rpc('update_user_channels', {
        user_id: userId,
        channel_id: channelId
    });

    return [addChannelData, addChannelError]
}

const updateWorkSpaceChannel = async (channelId: string, workspaceId: string) => {
    const supabase = await createClient()
const {data: updateWorkspaceData, error: updateWorkspaceError} = await supabase.rpc('add_channel_to_workspace', {
        workspace_id: workspaceId,
        channel_id: channelId
    });

    return [updateWorkspaceData, updateWorkspaceError]
}