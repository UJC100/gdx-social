import MainContent from "@/components/main-content"
import { ColorPrefrencesPrrovider } from "@/providers/color-prefrences"
import { ThemeProvider } from "@/providers/theme-provider"
import { WebSocketProvider } from "@/providers/web-socket"
import { FC, ReactNode } from "react"

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPrefrencesPrrovider>
          <MainContent>{children}</MainContent>
        </ColorPrefrencesPrrovider>
      </WebSocketProvider>
    </ThemeProvider>
  )
}

export default MainLayout
