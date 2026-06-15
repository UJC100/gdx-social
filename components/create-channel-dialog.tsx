import React, { Dispatch, FC, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import Typography from "./ui/typography"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { createChannel } from "@/actions/channels"

const CreateChannelDialog: FC<{
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  workspaceId: string
  userId: string
}> = ({ dialogOpen, setDialogOpen, workspaceId, userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: "workspace name must be more than 2 characters long",
      }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit({ name }: FormValues) {
    try {
      setIsSubmitting(true)

      setIsSubmitting(false)
      setDialogOpen(false)
      form.reset()
      toast.success(`${name} workspace successfully created!`)
    } catch (error) {
      setIsSubmitting(false)
    }

    const result = await createChannel({
      name,
     userId,
     workspaceId
    })

    if (result?.error) {
      console.log(result.error)
    }


  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen((prevState) => !prevState)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4" asChild>
            <Typography text="Create Channel" variant="h4" />
          </DialogTitle>
        </DialogHeader>

        {/* CREATE CHANNEL FORM */}
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-submit">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Channel Name</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your channel name"
                    autoComplete="off"
                  />
                  <FieldDescription className="my-3">
                    This is your channel name
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="my-2" />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button disabled={isSubmitting} type="submit" form="form-submit">
            {isSubmitting ? (
              "Creating..."
            ) : (
              <Typography text="Create" variant="p" />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateChannelDialog
