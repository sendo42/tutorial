"use client";

import React from 'react'
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { signup } from "../actions/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserOptionalDefaultsSchema } from '../../../../prisma/generated/zod/modelSchema/UserSchema';
import { signupFormValuesSchema } from "../schemas";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import { useRouter } from "next/navigation"


const SignupForm = () => {
  const router = useRouter()
  const { form, action, handleSubmitWithAction } =
  useHookFormAction(
    signup, zodResolver(signupFormValuesSchema),
    {
          actionProps: {
            onSuccess: ({data}) => {
              if( data == null) return
              if (data.success) {
                toast.success(data.message)
                setTimeout(() => {
                  router.push("/mypage")
                }, 1000)
              } else {
                toast.error(data.message)
              }
            }
          },
          formProps: {
            defaultValues: {
              name: "",
              email: "",
              password: "",
              image: undefined,
            },
          },
          errorMapProps: {},
        }
      );
      
    return (
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ユーザー名</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    これは公開表示する名前です.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    通知を受け取るメールアドレスです。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    英数字含めて8文字以上で入力してください。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>画像</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="shadcn"
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      name={field.name} />
                  </FormControl>
                  <FormDescription>
                    これは公開表示する画像です。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" disabled={action.isPending}>
                {action.isPending ? "送信中..." : "送信"}
              </Button>
            </div>
          </form>
        </Form>
    </div>
  )
}

export default SignupForm