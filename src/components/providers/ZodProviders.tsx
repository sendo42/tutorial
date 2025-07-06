"use client"

import React from 'react'
import { useEffect, ReactNode } from 'react'
import { customErrorMap } from '@/lib/zod'
import { z } from 'zod'

type PropsType = {
    children: ReactNode
}

const ZodProviders = ({ children }: PropsType) => {
    useEffect(() => {
        z.setErrorMap(customErrorMap);
    }, []);

    return (
        <>{children}</>
  )
}

export default ZodProviders