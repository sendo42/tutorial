"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { createUserActions, CreateUserResult } from "./create-user-actions"

const createUserSchema = z.object({
    name: z.string().min(1).max(30),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
})

type CreateUserData = z.infer<typeof createUserSchema>

export default function ClientComponent() {
    const [result, setResult] = useState<CreateUserResult | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })
  const onSubmit: SubmitHandler<CreateUserData> = async (data) => {
    const res = await createUserActions(data)
    setResult(res)
  }


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
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


    <button>送信</button>
    </form>
  )
}