"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createUserActions, CreateUserResult } from "./create-user-actions"
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks"

const createUserSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})

export default function ClientComponent() {
    const [result, setResult] = useState<CreateUserResult | null>(null)
  const { form, action, handleSubmitWithAction } = 
    useHookFormAction(createUserActions, zodResolver(createUserSchema),
		{
			actionProps: {
                onSuccess: ({data}) => {
                 if(data == null) return
                 setResult(data)  
                }
            },
		})

    const {
        register,
        formState: { errors },
    } = form

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmitWithAction}>
      {/* register your input into the hook by invoking the "register" function */}


      {/* include validation with required or other standard HTML validation rules */}
      {/* errors will return when field validation fails  */}
      <div>
          <input className="border" {...register("name")} />
          {errors.name != null && <span>{errors.name.message}</span>}
      </div>
        <div>
          <input className="border" {...register("email")} />
          {errors.email != null && <span>{errors.email.message}</span>}
      </div>
        <div>
          <input className="border" {...register("password")} />
          {errors.password != null && <span>{errors.password.message}</span>}
      </div>
      {result != null && <p>{result.messeage}</p>}


    <button>{action.isPending ? "送信中..." : "送信"}</button>
    </form>
  )
}