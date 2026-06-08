"use client"

import { registerWithEmail } from "@/actions/register-with-email"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Typography from "@/components/ui/typography"
import { superbaseBrowserClient } from "@/supabase/supabaseClient"
import { zodResolver } from "@hookform/resolvers/zod"
import { Provider } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

import { BsSlack } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { RxGithubLogo } from "react-icons/rx"
import z from "zod"

const AuthPage = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
 
  const router = useRouter()

  useEffect(() => {
    const getCurrentUser = async () => {
        const {data: {
          session
        }} = await superbaseBrowserClient.auth.getSession()
        if(session) {
          return router.replace('/')
        }
    }
    getCurrentUser()

  }, [router])

  const formSchema = z.object({
    email: z
      .email()
      .min(2, { message: "email must be more than 2 characters long" }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsAuthenticating(true)
    const response = await registerWithEmail(values)
    const {data, error} = JSON.parse(response)
    setIsAuthenticating(false)
    if (error) {
      console.warn('sign in error', error)
    }
    return
  }

  async function socialAuth (provider: Provider) {
    setIsAuthenticating(true)
    await superbaseBrowserClient.auth.signInWithOAuth({
      provider,
      options:{
        redirectTo: `${location.origin}/auth/callback`
      }
    });
  }


  return (
    <div className="grid min-h-screen place-content-center bg-white p-5 text-center">
      <div className="max-w-112.5">
        <div className="mb-4 flex justify-center gap-3">
          <BsSlack size={30} />
          <Typography text="GDX" variant="h2" />
        </div>

        <Typography text="Sign in to your GDX" variant="h2" className="mb-3" />
        <Typography
          text="we suggest you use the email address you use at work"
          variant="p"
          className="mb-7 opacity-90"
        />

        <div className="flex flex-col space-y-4">
          <Button
            disabled={isAuthenticating}
            variant={"outline"}
            className="flex cursor-pointer space-x-3 border-2 py-6"
            onClick={() => socialAuth('google')}
          >
            <FcGoogle size={30} />
            <Typography
              text="Sign in with Google"
              variant="p"
              className="text-xl"
            />
          </Button>

          <Button
            disabled={isAuthenticating}
            variant={"outline"}
            className="flex cursor-pointer space-x-3 border-2 py-6"
            onClick={() => socialAuth('github')}
          >
            <RxGithubLogo size={30} />
            <Typography
              text="Sign in with Github"
              variant="p"
              className="text-xl"
            />
          </Button>
        </div>

        <div>
          <div className="my-6 flex items-center">
            <div className="mr-2.5 flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="ml-2.5 flex-1 border-t bg-neutral-300" />
          </div>

          {/* FORM */}
          <form onSubmit={form.handleSubmit(onSubmit)} id="form-submit">
            <fieldset disabled={isAuthenticating}>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Email@gmail.com"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Field className="flex justify-center pt-4">
                <Button type="submit" form="form-submit">
                  <Typography text="sign in with Email" variant="p" />
                </Button>
              </Field>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
