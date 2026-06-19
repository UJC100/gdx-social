"use client"

import { Channel, User, Workspace } from "@/types/app"
import { FC, useState } from "react"
import { v4 as uuid } from "uuid"
import { Card, CardContent } from "./ui/card"
import { File } from "lucide-react"
import Typography from "./ui/typography"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { supabaseBrowserClient } from "@/supabase/supabaseClient"
import { toast } from "sonner"

type ChatFileUploadProps = {
  userData: User
  workspaceData: Workspace
  channel: Channel
  toggleFileUploadModal: () => void
}

const ChatFileUpload: FC<ChatFileUploadProps> = ({
  userData,
  workspaceData,
  channel,
  toggleFileUploadModal
}) => {
  const [isUploading, setIsUploading] = useState(false)

  const formSchema = z.object({
    file: z
      .instanceof(FileList)
      .refine((files) => files?.length === 1, "File is required")
      .refine((files) => {
        const file = files?.[0]
        return (
          file?.type === "application/pdf" || file?.type.startsWith("image/")
        )
      }, "File must be an image or a PTF"),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  })

  const imageRef = form.register("file")

  async function handleUpload(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    const uniqueId = uuid();
    const file = values.file?.[0];
    if (!file) return;

    const supabase = supabaseBrowserClient;

    let fileTypePrefix = '';
    if (file.type === 'application/pdf') {
      fileTypePrefix = 'pdf';
    } else if (file.type.startsWith('image/')) {
      fileTypePrefix = 'img';
    }

    const fileName = `chat/${fileTypePrefix}-${uniqueId}`;

    const { data, error } = await supabase.storage
      .from('chat-files')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.log('Error uploading file', error);
      return { error: error.message };
    }

  
      const { data: channelMessageData, error: messageInsertError } = await supabase
        .from('messages')
        .insert({
          file_url: data.path,
          user_id: userData.id,
          channel_id: channel?.id,
          workspace_id: workspaceData.id,
        });


    if (messageInsertError) {
      console.log('Error inserting message', messageInsertError);
      return { error: messageInsertError.message };
    }

    setIsUploading(false);
    toggleFileUploadModal()
    toast.success('File uploaded successfully');
    form.reset();
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-gray-200">
          <File className="h-12 w-12" />
          <span className="text-sm font-medium text-gray-500">
            <Typography text="Drag and drop your files here" variant="p" />
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(handleUpload)}
            id="form-submit"
          >
            <FieldGroup>
              <Controller
                name="file"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="file" className="text-sm font-medium">
                      Files
                    </FieldLabel>
                    <Input
                      {...imageRef}
                      type="file"
                      id="file"
                      aria-invalid={fieldState.invalid}
                      placeholder="Choose a file"
                      accept="image/*,application/pdf"
                      autoComplete="off"
                      onChange={(event) => field.onChange(event.target?.files)}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <Field className="flex flex-col justify-center pt-4">
              <Button disabled={isUploading} type="submit" size='lg' form="form-submit">
                <Typography text="Upload" variant="p" />
              </Button>
            </Field>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatFileUpload
