import { Editor } from "@tiptap/react"
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  SquareCode,
  Strikethrough,
} from "lucide-react"
import { useTheme } from "next-themes"
import { FC } from "react"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { BsEmojiSmile } from "react-icons/bs"

const MenuBar: FC<{ editor: Editor }> = ({ editor }) => {
  const { resolvedTheme } = useTheme()

  return (
    <div className="absolute top-0 left-0 z-10 flex w-full flex-wrap items-center gap-2 bg-neutral-100 p-3 dark:bg-neutral-900">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <Italic className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <Strikethrough className="h-4 w-4" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <List className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <ListOrdered className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <Code className="h-4 w-4" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={
          editor.isActive("codeBlock")
            ? "border border-amber-500"
            : "border border-black"
        }
      >
        <SquareCode className="h-4 w-4" />
      </button>

      <Popover>
        <PopoverTrigger className="mt-1.5">
            <button>
                <BsEmojiSmile size={20}/>
            </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
            <Picker theme={resolvedTheme} data={data} onEmojiSelect={(emoji: any) => editor.chain().focus().insertContent(emoji.native).run()}/>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default MenuBar
