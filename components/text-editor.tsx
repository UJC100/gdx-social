'use client'

import { FC, useState } from 'react';
import { FiPlus } from 'react-icons/fi'
import { Send } from 'lucide-react';
import {EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'
import axios from 'axios'


import { Button } from './ui/button'
import MenuBar from './menu-bar';
import { Channel, Workspace } from '@/types/app';

type TextEditorProps = {
  apiUrl: string;
  type: 'channel' | 'directMessage'
  channel: Channel;
  workspaceData: Workspace
}

const TextEditor: FC<TextEditorProps> = ({apiUrl, type, channel, workspaceData}) => {
const [content, setContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit, Placeholder.configure({placeholder: `Message #${ type === 'channel' ? channel.name : "username"}`})
        ],
        autofocus:true,
        content,
        onUpdate({editor}){
          setContent(editor.getHTML())
        }
    })

    const handleSend = async () => {
      try {
        await axios.post(`${apiUrl}?channelId-${channel?.id}&workspaceId=${workspaceData.id}` ,
          {
            content,
        });
        setContent('')
        editor?.commands.setContent('')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative'>
        <div className='sticky top-0 z-10'>
           {editor && <MenuBar editor={editor}/>}
        </div>
        <div className='h-37.5 pt-11 flex w-full grow'>
          <EditorContent className="prose h-full dark:text-white leading-[1.15px] overflow-y-hidden whitespace-pre-wrap" editor={editor}/>
        </div>
        <div className='absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6'>
          <FiPlus size={28} className='dark:text-black'/>
        </div>
        <Button onClick={handleSend} disabled={!content} size={'sm'} className='absolute bottom-1 right-1'><Send/></Button>
    </div>
  )
}

export default TextEditor