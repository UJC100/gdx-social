"use client"

import { FC } from "react"
import { FiPlus } from "react-icons/fi"
import { GoDot, GoDotFill } from "react-icons/go"
import { GiNightSleep } from "react-icons/gi"
import { FaPencil } from "react-icons/fa6"

import { User, Workspace } from "@/types/app"
import SidebarNav from "./sidebar-nav"
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import Image from "next/image"
import { useColorPreferences } from "@/providers/color-prefrences"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Typography from "./ui/typography"
import { FaRegCalendarCheck } from "react-icons/fa"

type SidebarProp = {
  userWorkspaceData: Workspace[]
  currenWorkspaceData: Workspace
  userData: User
}

const Sidebar: FC<SidebarProp> = ({
  userData,
  userWorkspaceData,
  currenWorkspaceData,
}) => {
  const { color } = useColorPreferences()
  let backgroundColor = "bg-black/70"
  if (color === "green") {
    backgroundColor = "bg-green-700"
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700"
  }
  return (
    <aside
      className={`fixed top-0 left-0 z-30 flex h-screen w-20 flex-col items-center justify-between pt-17 pb-8`}
    >
      <SidebarNav
        userWorkspaceData={userWorkspaceData}
        currentWorkspaceData={currenWorkspaceData}
      />

      <div className="flex flex-col space-y-3">
        <div className="grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-[rgba(255,255,255,0.3)] text-white transition-all duration-300 hover:scale-110">
          <FiPlus size={20} />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="relative h-10 w-10 cursor-pointer">
                      <div className="h-full w-full overflow-hidden rounded-lg">
                        <Image
                          className="h-full w-full object-cover"
                          src={userData.avatar_url}
                          alt={userData.name || "user"}
                          width={300}
                          height={300}
                          priority
                        />
                        <div
                          className={cn(
                            "absolute right-[-20%] -bottom-1 z-10 rounded-full",
                            backgroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-xl text-white" />
                          ) : (
                            <GoDotFill className="text-green-600" size={17} />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={userData.avatar_url} />
                          <AvatarFallback>
                            {userData.name && userData.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <Typography
                            text={
                              userData.name ? userData.name : userData.email
                            }
                            variant="p"
                            className="font-bold"
                          />
                          <div className="flex items-center space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size={12} />
                            ) : (
                              <GoDotFill className="text-green-600" size={17} />
                            )}
                            <span className="text-xs">
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="group mt-4 mb-2 flex cursor-pointer items-center space-x-2 rounded border p-1">
                        <FaRegCalendarCheck className="group-hover:hidden" />
                        <FaPencil className="hidden group-hover:block" />
                        <Typography
                          text={"In a meeting"}
                          variant="p"
                          clasName="text-xs text-gray-600"
                        />
                      </div>

                      <div className="flex flex-col space-y-1">
                        <Typography
                          variant="p"
                          text={
                            userData.is_away
                              ? "Set yourself active"
                              : "Set yourself away"
                          }
                          className="cursor-pointer rounded px-2 py-1 hover:bg-blue-700 hover:text-white"
                        />

                        <Typography
                          variant="p"
                          text={
                            "Clear Status"
                          }
                          className="cursor-pointer rounded px-2 py-1 hover:bg-blue-700 hover:text-white"
                        />
                        <hr className="bg-gray-400"/>
                        <Typography
                          variant="p"
                          text={
                           "Profile"
                          }
                          className="cursor-pointer rounded px-2 py-1 hover:bg-blue-700 hover:text-white"
                        />
                         <hr className="bg-gray-400"/>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  )
}

export default Sidebar
