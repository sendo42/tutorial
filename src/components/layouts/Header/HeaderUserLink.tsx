import Link from 'next/link'
import React from 'react'
import { ShoppingCart, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from '@/lib/session';


const HeaderUserLink = async () => {
    const { imageUrl } = await getCurrentUser()
    
  return (
    <Link href="/profile">
        <Avatar className="size-8">
            <AvatarImage src={imageUrl ?? undefined} alt="ユーザー画像"/>
            <AvatarFallback>
                <User size={32}/>
            </AvatarFallback>
        </Avatar>
    </Link>
  )
}

export default HeaderUserLink