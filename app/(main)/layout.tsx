import MainContent from "@/components/main-content"
import { ColorPrefrencesPrrovider } from "@/providers/color-prefrences"
import { ThemeProvider } from "@/providers/theme-provider"
import { FC, ReactNode } from "react"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
        <ColorPrefrencesPrrovider><MainContent>{children}</MainContent></ColorPrefrencesPrrovider>
     
    </ThemeProvider>
  )
}

export default MainLayout
