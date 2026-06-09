import { getUserData } from "@/actions/get-user-data"
import {
  getCurrentWorkspaceData,
  getUserWorkSpaceData,
} from "@/actions/workspaces"
import Sidebar from "@/components/sidebar"
import { Workspace as UserWorkspace } from "@/types/app"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

const Workspace = async ({ params }: Props) => {
  const { id } = await params
  const userData = await getUserData()

  if (!userData) {
    return redirect("/auth")
  }

  const [userWorkspaceData, userWorkspaceError] = await getUserWorkSpaceData(
    userData.workspaces!
  )

  const [currentWorkspaceData, currentWorkspaceError] =
    await getCurrentWorkspaceData(id)

  return (
    <>
      <div className="hidden md:block">
        <Sidebar currenWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
        />
      </div>
      <div className="block min-h-screen md:hidden">mobile</div>
    </>
  )
}

export default Workspace
