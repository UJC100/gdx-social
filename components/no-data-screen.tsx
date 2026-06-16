import React, { FC } from 'react'

const NoDataScreen: FC<{workspaceName: string;
    userId:string;
    workspaceId: string;
}> = ({userId, workspaceId, workspaceName}) => {
  return (
    <div>NoDataScreen</div>
  )
}

export default NoDataScreen