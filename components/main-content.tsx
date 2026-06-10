"use client"

import { cn } from "@/lib/utils"
import { useColorPreferences } from "@/providers/color-prefrences"
import { useTheme } from "next-themes"
import { FC, ReactNode } from "react"

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useTheme()
  const { color } = useColorPreferences()

  let backgroundColor = "bg-black/80"
  if (color === "green") {
    backgroundColor = "bg-green-700"
  } else if (color === "blue") {
    backgroundColor = "bg-blue-700"
  }
  return (
    <div className={cn("md:h-screen md:px-2 md:pt-14 md:pb-2", backgroundColor)}>
      <main
        className={cn(
          "overflow-y-scroll md:ml-70 md:h-full lg:ml-105 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none",
          theme === 'dark' ? 'bg-[#232529]' : 'bg-white'
        )}
      >
        {children}
      </main>
    </div>
  )
}

export default MainContent
