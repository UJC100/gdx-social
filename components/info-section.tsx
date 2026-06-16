"use client"

import { cn } from "@/lib/utils"
import { useColorPreferences } from "@/providers/color-prefrences"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { FC, useState } from "react"
import { IoMdArrowDropdown,  IoMdArrowDropup} from "react-icons/io";
import Typography from "./ui/typography"
import { FaPlus } from "react-icons/fa6"
import CreateChannelDialog from "./create-channel-dialog"
import { Channel, User, Workspace } from "@/types/app"
import { useRouter } from "next/navigation"


const InfoSection: FC<{userData: User; currentWorkspaceData: Workspace, userWorkspaceChannels: Channel[],
currentChannelId: string
}> = ({userData, currentWorkspaceData, userWorkspaceChannels, currentChannelId}) => {
  const { color } = useColorPreferences()

  const [isChannelCollapsed, setIsChannelCollapsed] = useState(true)
  const [isDmCollapsed, setIsDmCollapsed] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  

  let backgroundColor = "bg-primary-light"
  if (color === "green") {
    backgroundColor = "bg-green-900"
  } else if (color === "blue") {
    backgroundColor = "bg-blue-900"
  }

  let secondaryBg = "bg-primary-dark"
  if (color === "green") {
    secondaryBg = "bg-green-700"
  } else if (color === "blue") {
    secondaryBg = "bg-blue-700"
  }

  const navigateToChannel = (channelId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/channels/${channelId}`
    router.push(url)
  }

  return (
    <div
      className={cn(
        "fixed left-20 z-20 flex h-[calc(100%-63px)] flex-col items-center justify-between rounded-l-xl text-white md:w-52 lg:w-87.5",
        backgroundColor
      )}
    >
      <div className="flex w-full flex-col gap-2 p-3">
        <div>
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={() =>
              setIsChannelCollapsed((prevState) => !prevState)
            }
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer">
                {isChannelCollapsed ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                <Typography variant="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn("cursor-pointer rounded-full p-2", `hover:${secondaryBg}`)}>
                <FaPlus onClick={() => setDialogOpen(true)}/>
              </div>
            </div>
            <CollapsibleContent>
            {
                userWorkspaceChannels.map(channel =>   {
                  const currentActiveChannel = currentChannelId === channel.id
                    return   <Typography 
                    key={channel.id}
                    onClick={() => navigateToChannel(channel.id)}
                    variant="p"
                    text={`#${channel.name}`}
                    className={cn('px-2 py-1 rounded-sm cursor-pointer', `hover:${secondaryBg}`,
                      currentActiveChannel && secondaryBg
                    )}
                    />
                   }
                )
            }
           
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
            <Collapsible open={isDmCollapsed}
            onOpenChange={() => setIsDmCollapsed(prevState => !prevState)}
            className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer">
                {isDmCollapsed ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
                <Typography variant="p" text="Direct Messages" className="font-bold" />
              </CollapsibleTrigger>
               <div className={cn("cursor-pointer rounded-full p-2", `hover:${secondaryBg}`)}>
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
            <Typography variant="p" text="User name 1"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', `hover:${secondaryBg}`)}
            />
            <Typography variant="p" text="User name 2"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', `hover:${secondaryBg}`)}
            />
            <Typography variant="p" text="User name 3"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', `hover:${secondaryBg}`)}
            />
            </CollapsibleContent>

            </Collapsible>
        </div>
      </div>

      <CreateChannelDialog
      setDialogOpen={setDialogOpen}
      dialogOpen={dialogOpen}
      workspaceId={currentWorkspaceData.id}
      userId={userData.id}
      />
    </div>
  )
}

export default InfoSection
