import { getUserData } from '@/actions/get-user-data'
import { getUserWorkspaceChannels } from '@/actions/get-user-workspace-channels'
import { getCurrentWorkspaceData, getUserWorkSpaceData } from '@/actions/workspaces'
import InfoSection from '@/components/info-section'
import NoDataScreen from '@/components/no-data-screen'
import Sidebar from '@/components/sidebar'
import { Workspace as UserWorkspace } from "@/types/app"
import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{
    workspaceId: string,
    channelId: string
  }>
}

const CurrentChannel = async ({params}: Props) => {
  const {workspaceId, channelId} = await params
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
     <div className="hidden md:block">
        <Sidebar currenWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
        />
        <InfoSection currentWorkspaceData={currentWorkspaceData} userData={userData}
        userWorkspaceChannels={userWorkspaceChannels}
        currentChannelId={channelId}
        />
      
      <NoDataScreen
      workspaceId={currentWorkspaceData.id}
      workspaceName={currentWorkspaceData.name}
      userId={userData.id}
      />
      </div>
  )
}

export default CurrentChannel