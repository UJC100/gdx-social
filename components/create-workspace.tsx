"use client"
import { FaPlus } from "react-icons/fa";
import slugify from "slugify"
import {v4 as uuidv4} from "uuid"


import { Button } from "./ui/button"
import Typography from "./ui/typography"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field"
import z from "zod"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import ImageUpload from "./image-upload"
import { createWorkspace } from "@/actions/create-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UseCreateWorkspaceValues } from "@/hooks/create-workspace-values";
import { useState } from "react";

const CreateWorkspace = () => {
const router = useRouter()
const {imageurl, updateImageurl} = UseCreateWorkspaceValues()

const [isOpen, setIsOpen] = useState(false)
const [isSubmitting, setIsSubmitting] = useState(false)


    const formSchema = z.object({
        name: z
          .string()
          .min(2, { message: "workspace name must be more than 2 characters long" }),
      })
    
      type FormValues = z.infer<typeof formSchema>
    
      const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })

      async function onSubmit ({name}: FormValues) {
        const slug = slugify(name, {lower:true})
        const invite_code = uuidv4();
        
        setIsSubmitting(true)

        const result = await createWorkspace({name, slug, invite_code, imageUrl: imageurl});

        setIsSubmitting(false)

        if(result?.error) {
            console.log(result.error)
        }


        form.reset()
        updateImageurl('')
        setIsOpen(false)
        router.refresh()
        toast.success(`${name} workspace successfully created!`)
      }
    

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(prevValue => !prevValue)}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 p-2 cursor-pointer">
          <Button variant={"secondary"}>
            <FaPlus />
          </Button>
          <Typography variant="p" text="Add Workspace" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4" asChild>
            <Typography variant="h4" text="Create workspace" />
          </DialogTitle>
        </DialogHeader>

        {/* CREATE WORKSPACE FORM */}
       <form onSubmit={form.handleSubmit(onSubmit)} id="form-submit">
            
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Your company name"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            

              <Field className="flex flex-col justify-center pt-4">
                  <ImageUpload/>
                <Button disabled={isSubmitting} type="submit" form="form-submit" >
                  <Typography text="Create" variant="p" />
                </Button>
              </Field>
       
          </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateWorkspace
