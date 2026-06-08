"use server"

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { updateUserWorkspace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

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

  const {error, data: workspaceRecord} = await supabase.from('workspaces').insert({
    image_url: imageUrl,
    name,
    super_admin: userData.id,
    slug,
    invite_code
  }).select('*')

  console.log("workspaceRecord", workspaceRecord);
console.log("workspaceInsertError", error);

  if(error) {
    return {error};
  }

  const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(userData.id, workspaceRecord[0].id);


console.log("updateWorkspaceData", updateWorkspaceData);
console.log("updateWorkspaceError", updateWorkspaceError);

  if( updateWorkspaceError){
    return {error: updateWorkspaceError}
  }

  //Add user to workspace members

  const [addMemberToWorkspaceData, addMemberToWorkspaceError] = await addMemberToWorkspace(userData.id, workspaceRecord[0].id)

  console.log("addMemberToWorkspaceData", addMemberToWorkspaceData);
console.log("addMemberToWorkspaceError", addMemberToWorkspaceError);

  if(addMemberToWorkspaceError){
    return {error: addMemberToWorkspaceError}
  }
}