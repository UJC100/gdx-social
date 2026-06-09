import { User, Workspace } from "@/types/app";
import { FC } from "react";
import SidebarNav from "./sidebar-nav";

type SidebarProp = {
    userWorkspaceData: Workspace[];
    currenWorkspaceData: Workspace;
    userData: User;
}


const Sidebar: FC<SidebarProp> = ({userData, userWorkspaceData, currenWorkspaceData}) => {
    
  return (<aside className={`
    fixed
    top-0
    left-0
    pt-17
    pb-8
    z-30
    flex
    flex-col
    justify-between
    items-center
    h-screen
    w-20
    `}>
        <SidebarNav userWorkspaceData={userWorkspaceData} currentWorkspaceData={currenWorkspaceData}/>
    </aside>);
};

export default Sidebar;