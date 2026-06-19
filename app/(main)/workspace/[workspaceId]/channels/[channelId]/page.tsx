import { getUserData } from "@/actions/get-user-data"
import { getUserWorkspaceChannels } from "@/actions/get-user-workspace-channels"
import {
  getCurrentWorkspaceData,
  getUserWorkSpaceData,
} from "@/actions/workspaces"
import ChatHeader from "@/components/chat-header"
import InfoSection from "@/components/info-section"
import Sidebar from "@/components/sidebar"
import TextEditor from "@/components/text-editor"
import Typography from "@/components/ui/typography"
import { Workspace as UserWorkspace } from "@/types/app"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    workspaceId: string
    channelId: string
  }>
}

const CurrentChannel = async ({ params }: Props) => {
  const { workspaceId, channelId } = await params
  const userData = await getUserData()
  console.log(channelId)
  if (!userData) {
    return redirect("/auth")
  }

  const [userWorkspaceData] = await getUserWorkSpaceData(userData.workspaces!)

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId)

  const userWorkspaceChannels = await getUserWorkspaceChannels(
    currentWorkspaceData.id,
    userData.id
  )

  const currentChannelData = userWorkspaceChannels.find(
    (channel) => channel.id === channelId
  )

  if (!currentChannelData) return redirect("/")

  return (
    <div className="hidden md:block">
     <div className="h-[calc(100vh-256px)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none">
       <Sidebar
        currenWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
      />
      <InfoSection
        currentWorkspaceData={currentWorkspaceData}
        userData={userData}
        userWorkspaceChannels={userWorkspaceChannels}
        currentChannelId={channelId}
      />
      <div className="relative w-full overflow-hidden p-4">
        <ChatHeader title={currentChannelData.name} />

        <div className="mt-10">
          <Typography text="Chat Content" variant="h4" />
        </div>
      </div>
     </div>

     <div className="m-4">
      <TextEditor apiUrl="/api/web-socket/messages" type='channel' channel={currentChannelData} workspaceData={currentWorkspaceData} userData={userData}/>
     </div>
    </div>
  )
}

export default CurrentChannel
