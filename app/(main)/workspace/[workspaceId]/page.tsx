import { getUserData } from "@/actions/get-user-data"
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels"
import {
  getCurrentWorkspaceData,
  getUserWorkSpaceData,
} from "@/actions/workspaces"
import InfoSection from "@/components/info-section"
import Sidebar from "@/components/sidebar"
import { Workspace as UserWorkspace } from "@/types/app"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    workspaceId: string
  }>
}

const Workspace = async ({ params }: Props) => {
  const { workspaceId } = await params
  const userData = await getUserData()

  if (!userData) {
    return redirect("/auth")
  }

  const [userWorkspaceData] = await getUserWorkSpaceData(
    userData.workspaces!
  )

  const [currentWorkspaceData] =
    await getCurrentWorkspaceData(workspaceId)

    const userWorkspaceChannels = await getUserWorkspaceChannels(currentWorkspaceData.id, userData.id)



  return (
    <>
      <div className="hidden md:block">
        <Sidebar currenWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection currentWorkspaceData={currentWorkspaceData} userData={userData}
        userWorkspaceChannels={userWorkspaceChannels}
        currentChannelId=""
        />
      </div>
      <div className="block min-h-screen md:hidden">mobile</div>
    </>
  )
}

export default Workspace
