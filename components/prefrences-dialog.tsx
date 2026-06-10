"use client"

import { HiOutlinePaintBrush } from "react-icons/hi2"
import { MdLightMode } from "react-icons/md"

import { useColorPreferences } from "@/providers/color-prefrences"
import { useTheme } from "next-themes"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"
import Typography from "./ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { BsLaptop } from "react-icons/bs"

const PrefrencesDialog = () => {
  const { setTheme, theme } = useTheme()

  const { selectColor } = useColorPreferences()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Typography
          className="cursor-pointer rounded px-2 py-1 hover:bg-blue-700 hover:text-white"
          text="Preferences"
          variant="p"
        />
      </DialogTrigger>
      <DialogContent className="max-w-xs md:w-fit">
        <DialogTitle className="py-5 font-bold">
          Preferences
          <hr className="bg-gray-200" />
        </DialogTitle>
        <Tabs orientation="horizontal" defaultValue="themes">
          <TabsList>
            <TabsTrigger value="themes">
              <HiOutlinePaintBrush />
              <Typography text="Themes" variant="p" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="themes" className="max-w-xs md:max-w-fit">
            <Typography
              text="Color Mode"
              variant="p"
              className="py-2 font-bold"
            />
            <Typography
              text="Choose if GDX apprearance should be light or dark, or follow the computer settings"
              variant="p"
              className="pb-4"
            />
            <div className="flex flex-wrap gap-3">
              <Button
              variant={'outline'}
              onClick={() => setTheme('light')}
                className={`w-full cursor-pointer ${cn(theme === "light" && "border-blue-600")}`}
              >
                <MdLightMode className="mr-2" size={20} />
                <Typography text="Light" variant="p" />
              </Button>

              <Button
              variant={'outline'}
              onClick={() => setTheme('dark')}
                className={`w-full cursor-pointer ${cn(theme === "dark" && "border-blue-600")}`}
              >
                <BsLaptop className="mr-2" size={20} />
                <Typography text="dark" variant="p" />
              </Button>

              <Button
              variant={'outline'}
              onClick={() => setTheme('system')}
                className={`w-full cursor-pointer ${cn(theme === "system" && "border-blue-600")}`}
              >
                <BsLaptop className="mr-2" size={20} />
                <Typography text="System" variant="p" />
              </Button>
            </div>
            <hr  className="bg-gray-200 my-5"/>
            <Typography
            text="Single Color"
            variant="p" className="py-2 font-bold"/>
            <div className="flex flex-wrap gap-5">
                <Button variant={'outline'} onClick={() => selectColor('green')}
                    className="w-full hover:border-green-800 border-2"
                    >
                    Green
                </Button>
                <Button variant={'outline'} onClick={() => selectColor('blue')}
                    className="w-full hover:border-blue-800 border-2"
                    >
                    Blue
                </Button>
                <Button variant={'destructive'} onClick={() => selectColor('')}
                    className="w-full hover:border-red-800 border-2"
                    >
                    Reset
                </Button>

            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default PrefrencesDialog
