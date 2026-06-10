import { Workspace } from "@/types/app"
import { FC } from "react"
import { FaPlus } from "react-icons/fa"
import {RiHome2Fill} from "react-icons/ri"
import {PiChatsTeardrop} from "react-icons/pi"


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Typography from "./ui/typography"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

type SidebarNavProps = {
  userWorkspaceData: Workspace[]
  currentWorkspaceData: Workspace
}

const SidebarNav: FC<SidebarNavProps> = ({
  userWorkspaceData,
  currentWorkspaceData,
}) => {
  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        <li>
          <div className="mb-4 h-10 w-10 cursor-pointer items-center overflow-hidden rounded-lg text-white">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger> 
                  <Avatar>
                    <AvatarImage
                      src={currentWorkspaceData.image_url || ""}
                      alt={currentWorkspaceData.name}
                      className="h-full w-full object-cover"
                    />
                    <AvatarFallback className="bg-neutral-700">
                      <Typography
                        variant="p"
                        text={currentWorkspaceData.name.slice(0, 2)}
                      />
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent className="p-0 bg-white border-none" side="bottom">
                  <Card className="w-87.5 border border-none">
                    <CardContent className="flex flex-col p-0">
                      {userWorkspaceData.map((workspace) => (
                        <div
                          key={workspace.id}
                          className="flex items-center gap-2 px-2 py-1 hover:opacity-70"
                        >
                          <Avatar>
                            <AvatarImage
                              src={currentWorkspaceData.image_url || ""}
                              alt={currentWorkspaceData.name}
                              className="h-full w-full object-cover"
                            />
                            <AvatarFallback>
                              <Typography
                                variant="p"
                                text={currentWorkspaceData.name.slice(0, 2)}
                              />
                            </AvatarFallback>
                          </Avatar>
                          <div className="">
                            <Typography
                              variant="p"
                              text={workspace.name}
                              className="text-sm"
                            />
                            <Typography
                              variant="p"
                              text={workspace.invite_code || ""}
                              className="text-[12px]"
                            />
                          </div>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex items-center gap-2 p-2">
                        <Button variant={"secondary"}>
                          <FaPlus />
                        </Button>
                        <Typography variant="p" text="Add Workspace" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
                <RiHome2Fill size={20} className="group-hover:scale-125 transition-all duration-300"/>
            </div>
            <Typography variant="p" text="Home" className="text-sm lg:text-sm md:text-sm"/>
          </div>
        </li>
        <li>
             <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
                <PiChatsTeardrop size={20} className="group-hover:scale-125 transition-all duration-300"/>
            </div>
            <Typography variant="p" text="Chats" className="text-sm lg:text-sm md:text-sm"/>
          </div>

        </li>
      </ul>
    </nav>
  )
}

export default SidebarNav
