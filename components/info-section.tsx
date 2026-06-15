"use client"

import { cn } from "@/lib/utils"
import { useColorPreferences } from "@/providers/color-prefrences"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import { FC, useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import Typography from "./ui/typography"
import { FaPlus } from "react-icons/fa6"
import CreateChannelDialog from "./create-channel-dialog"
import { User, Workspace } from "@/types/app"

const InfoSection: FC<{userData: User; currentWorkspaceData: Workspace}> = ({userData, currentWorkspaceData}) => {
  const { color } = useColorPreferences()

  const [isChannelCollapsed, setIsChannelCollapsed] = useState(false)
  const [isDmCollapsed, setIsDmCollapsed] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  

  let backgroundColor = "bg-primary-light"
  if (color === "green") {
    backgroundColor = "bg-green-900"
  } else if (color === "blue") {
    backgroundColor = "bg-blue-900"
  }

  let hoverBg = " hover:bg-primary-dark"
  if (color === "green") {
    hoverBg = "hover:bg-green-700"
  } else if (color === "blue") {
    hoverBg = "hover:bg-blue-700"
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
                {isChannelCollapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <Typography variant="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div className={cn("cursor-pointer rounded-full p-2", hoverBg)}>
                <FaPlus onClick={() => setDialogOpen(true)}/>
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                variant="p"
                text="# Channel-name-1"
                className={cn("cursor-pointer rounded-sm p-2 py-1", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel-name-2"
                className={cn("cursor-pointer rounded-sm p-2 py-1", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel-name-3"
                className={cn("cursor-pointer rounded-sm p-2 py-1", hoverBg)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div>
            <Collapsible open={isDmCollapsed}
            onOpenChange={() => setIsDmCollapsed(prevState => !prevState)}
            className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer">
                {isDmCollapsed ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <Typography variant="p" text="Direct Messages" className="font-bold" />
              </CollapsibleTrigger>
               <div className={cn("cursor-pointer rounded-full p-2", hoverBg)}>
                <FaPlus />
              </div>
            </div>
            <CollapsibleContent>
            <Typography variant="p" text="User name 1"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', hoverBg)}
            />
            <Typography variant="p" text="User name 2"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', hoverBg)}
            />
            <Typography variant="p" text="User name 3"
            className={cn('px-2 py-1 rounded-sm cursor-pointer', hoverBg)}
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
