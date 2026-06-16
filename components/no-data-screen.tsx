"use client"

import React, { FC, useState } from "react"
import Typography from "./ui/typography"
import { Button } from "./ui/button"
import CreateChannelDialog from "./create-channel-dialog"

const NoDataScreen: FC<{
  workspaceName: string
  userId: string
  workspaceId: string
}> = ({ userId, workspaceId, workspaceName }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  
  return (
    <div className="h-[calc(100vh-63px)] w-full p-4">
      <Typography
        text={`👋 Welcome to the # ${workspaceName} workspace`}
        variant="p"
        className="my-3"
      />
      <Typography
        text={`Get started by creating a channel or direct message`}
        variant="p"
        className="my-3"
      />

      <div className="w-fit">
        <Button className="my-2 w-full cursor-pointer" onClick={() => setDialogOpen(true)}>
          <Typography text="Create Channel" variant="p" />
        </Button>
      </div>

      <CreateChannelDialog
        userId={userId}
        workspaceId={workspaceId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  )
}

export default NoDataScreen
