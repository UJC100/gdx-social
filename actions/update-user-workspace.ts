import { createClient } from "@/supabase/supabaseServer"

export const updateUserWorkspace = async (userId: string, WorkspaceId: string) => {
  const supabase = await createClient()

  const {data: updateWorkspaceData, error: updateWorkspaceError} = await supabase.rpc("add_workspace_to_user", {
    user_id: userId,
    new_workspace: WorkspaceId,
  })

  return [updateWorkspaceData, updateWorkspaceError]
}
