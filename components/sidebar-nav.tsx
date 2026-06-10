import { FC, useState } from "react"
import {RiHome2Fill} from "react-icons/ri"
import {PiChatsTeardrop} from "react-icons/pi"



import { Workspace } from "@/types/app"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Typography from "./ui/typography"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import CreateWorkspace from "./create-workspace"
import { useRouter } from "next/navigation"
import ProgressBar from "./progress-bar"
import { cn } from "@/lib/utils"
import { useColorPreferences } from "@/providers/color-prefrences"

type SidebarNavProps = {
  userWorkspaceData: Workspace[]
  currentWorkspaceData: Workspace
}

const SidebarNav: FC<SidebarNavProps> = ({
  userWorkspaceData,
  currentWorkspaceData,
}) => {
     const { color } = useColorPreferences()
      let backgroundColor = "bg-black/70"
      if (color === "green") {
        backgroundColor = "bg-green-700"
      } else if (color === "blue") {
        backgroundColor = "bg-blue-700"
      }
    const [switchingWorkspace, setSwitchingWorkspace] = useState(false)
    const router = useRouter()
    const switchWorkspace = (id: string) => {
        setSwitchingWorkspace(true)
        router.push(`/workspace/${id}`);
    }

  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        <li>
          <div className="mb-4 h-10 w-10 cursor-pointer items-center overflow-hidden rounded-lg text-white">
          
              <Popover>
                <PopoverTrigger asChild> 
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
                </PopoverTrigger >
                <PopoverContent className="p-0 bg-white border-none mt-2" side="bottom">
                  <Card className="w-87.5 border border-none">
                    <CardContent className="flex flex-col p-0">
                        {switchingWorkspace ?
                        <div className="m-2 bg-gray-500">
                            <ProgressBar/> 
                        </div> :  userWorkspaceData.map((workspace) => {

                            const isActive = workspace.id === currentWorkspaceData.id;
                            return <div
                          key={workspace.id}
                          className={cn(
                            isActive && `${backgroundColor} text-white`,  
                            'flex items-center gap-2 px-2 py-1 cursor-pointer  border-b')}
                          onClick={() => switchWorkspace(workspace.id)}
                        >
                          <Avatar>
                            <AvatarImage
                              src={workspace.image_url || ""}
                              alt={workspace.name}
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
                              className="text-sm font-bold"
                            />
                            <Typography
                              variant="p"
                              text={workspace.invite_code || ""}
                              className="text-[12px]"
                            />
                          </div>
                        </div>
                        })}
                      
                      <Separator />
                    <CreateWorkspace/>
                    </CardContent>
                  </Card>
                </PopoverContent>
              </Popover>
          
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
