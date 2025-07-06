"use client";

import React from 'react'
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { loginFormValuesSchema } from '../schemas/index';
import { login } from "../actions/login";


const LoginForm = () => {
  const router = useRouter()
  const { form, action, handleSubmitWithAction } =
  useHookFormAction(
    login, zodResolver(loginFormValuesSchema),
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
              email: "",
              password: "",
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

export default LoginForm