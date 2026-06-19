"use client"

import { FC, useState } from "react"
import { FiPlus } from "react-icons/fi"
import { Send } from "lucide-react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import axios from "axios"

import { Button } from "./ui/button"
import MenuBar from "./menu-bar"
import { Channel, User, Workspace } from "@/types/app"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import ChatFileUpload from "./chat-file-upload"

type TextEditorProps = {
  apiUrl: string
  type: "channel" | "directMessage"
  channel: Channel
  workspaceData: Workspace
  userData: User
}

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workspaceData,
  userData
}) => {
  const [content, setContent] = useState("")
  const [fileUploadModal, setFileUploadModal] = useState(false)

  const toggleFileUploadModal = () => {
    setFileUploadModal((prevState) => !prevState)
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `Message #${type === "channel" ? channel.name : "username"}`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML())
    },
  })

  const handleSend = async () => {
    try {
      await axios.post(
        `${apiUrl}?channelId-${channel?.id}&workspaceId=${workspaceData.id}`,
        {
          content,
        }
      )
      setContent("")
      editor?.commands.setContent("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="relative rounded-md border border-neutral-700 p-1 dark:border-zinc-500">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="flex h-37.5 w-full grow pt-11">
        <EditorContent
          className="prose h-full overflow-y-hidden leading-[1.15px] whitespace-pre-wrap dark:text-white"
          editor={editor}
        />
      </div>
      <div className="absolute top-3 right-3 z-10 grid h-6 w-6 cursor-pointer place-content-center rounded-full bg-black text-white transition-all duration-500 hover:scale-110 dark:bg-white">
        <FiPlus
          onClick={toggleFileUploadModal}
          size={28}
          className="dark:text-black"
        />
      </div>
      <Button
        onClick={handleSend}
        disabled={!content}
        size={"sm"}
        className="absolute right-1 bottom-1"
      >
        <Send />
      </Button>

      <Dialog onOpenChange={toggleFileUploadModal} open={fileUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Upload a file to share with your team
            </DialogDescription>
          </DialogHeader>
          <ChatFileUpload userData={userData} workspaceData={workspaceData} channel={channel}
          toggleFileUploadModal={toggleFileUploadModal}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TextEditor
