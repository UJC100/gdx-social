"use client"
import { createWorkspace } from "@/actions/create-workspace"
import ImageUpload from "@/components/image-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Typography from "@/components/ui/typography"
import { UseCreateWorkspaceValues } from "@/hooks/create-workspace-values"
import { useState } from "react"
import slugify from 'slugify'
import {v4 as uuid} from 'uuid'

const CreateWorkspace = () => {
  const { currStep } = UseCreateWorkspaceValues()
  let stepInView = null

  switch (currStep) {
    case 1:
      stepInView = <Step1 />
      break
    case 2:
      stepInView = <Step2 />
      break

    default:
      stepInView = <Step1 />
  }
  return (
    <div className="grid h-screen w-screen place-content-center bg-neutral-800 text-white">
      <div className="max-w-137.5 p-3">
        <Typography
          text={`step ${currStep} of 2`}
          variant="p"
          clasName="text-nuetral-400"
        />
        {stepInView}
      </div>
    </div>
  )
}

export default CreateWorkspace

const Step1 = () => {
  const { name, updateValues, setCurrStep } = UseCreateWorkspaceValues()

  return (
    <>
      <Typography
        text="What is the name of your company or team"
        clasName="my-4"
      />
      <Typography
        text="This will be the name of your GDX workspace - choose a name your team will recognize"
        clasName="text-neutral-300 mb-10"
        variant="p"
      />

      <form>
        <fieldset>
          <Input
            className="border-neutral-600 bg-neutral-700 text-white"
            type="text"
            value={name}
            placeholder="Enter your company name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />
          <Button
            disabled={!name}
            type="button"
            className="mt-5 cursor-pointer"
            onClick={() => setCurrStep(2)}
          >
            <Typography text="Next" variant="p" />
          </Button>
        </fieldset>
      </form>
    </>
  )
}

const Step2 = () => {
  const { name, updateValues, setCurrStep, updateImageurl, imageurl } =
    UseCreateWorkspaceValues()
    const  [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const slug = slugify(name);
    const invite_code = uuid();
    createWorkspace({imageUrl: imageurl, name, slug, invite_code});
    setIsSubmitting(false)
  }

  return (
    <>
      <Button
        size={"sm"}
        className="mt-2 bg-gray-700 text-white"
        variant={"link"}
        onClick={() => setCurrStep(1)}
      >
        <Typography text="Back" variant="p" />
      </Button>

      <form>
        <Typography text="Add workspace avatar" clasName="my-4" />
        <Typography
          text="This image can be changed later in you workspace settings."
          clasName="text-neutral-300"
          variant="p"
        />
        <fieldset disabled={isSubmitting} className="mt-6 flex flex-col items-center space-y-9">
          <ImageUpload/>
          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageurl("")
                handleSubmit()
              }}
            >
              {" "}
              <Typography text="Skip for now" variant="p" />
            </Button>
            {imageurl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size={"sm"}
                variant={"destructive"}
              >
                {" "}
                <Typography text="Submit" variant="p" />
              </Button>
            ) : (
              <Button 
              type="button" 
              size={"sm"} className="bg-gray-500 text-white">
                <Typography text="select an image" variant="p" />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </>
  )
}
