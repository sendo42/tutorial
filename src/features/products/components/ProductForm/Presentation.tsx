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
import { productCreateFormValuesSchema } from '../../schemas/index';
import { createProduct } from "../../actions/createProduct";
import { Product } from '@prisma/client';
import { productUpdateFormValuesSchema } from '../../schemas/index';
import { updateProduct } from "../../actions/updateProduct";

type PropsType = {
  product?: Product
}

const ProductFormPresentation = ({ product }: PropsType) => {
  const isEdit = product != null

  const router = useRouter()
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    isEdit ? updateProduct : createProduct,
    zodResolver(isEdit ? productUpdateFormValuesSchema : productCreateFormValuesSchema),
    {
          actionProps: {
            onSuccess: ({data}) => {
              if( data == null) return
              if (data.success) {
                toast.success(data.message)
                setTimeout(() => {
                  router.push(`/mypage/products/${data.id}`)
                }, 1000)
              } else {
                toast.error(data.message)
              }
            }
          },
          formProps: {
            defaultValues: {
              ...(isEdit ? { id: product.id } : {}),
              title: product?.title ?? "",
              description: product?.description ?? "",
              price: product?.price ?? 0,
              stock: product?.stock ?? 0,
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品名</FormLabel>
                  <FormControl>
                    <Input placeholder="商品1" {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>商品説明</FormLabel>
                  <FormControl>
                    <Input placeholder="商品1の説明" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>価格</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>在庫数</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      onBlur={field.onBlur}
                      name={field.name} />
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

export default ProductFormPresentation