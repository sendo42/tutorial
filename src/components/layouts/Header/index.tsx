import Link from 'next/link'
import React from 'react'
import { ShoppingCart, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser } from '@/lib/session';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = async () => {
    const pathname = usePathname()
    const { imageUrl } = await getCurrentUser()
    const isActive = (path: string) => {
        return pathname === path || pathname.startsWith(path)
    }
  return (
    <header className = "sticky top-0 z-50 border-b bg-background">
        <div className="w-11/12 mx-auto flex w-11/12 items-center justify-between">
            <h1 className="text-xl fint-bold">ECサイト</h1>
            <div className="flex items-center gap-2">
                <Link className={cn(
                    "text-sm text-gray-400 hover:text-primary transition-colors",
                    isActive("mypage") && "textprimary"
                )}
                href="/mypage">
                    マイページ
                </Link>
                <Link 
                    className={cn(
                        "text-sm text-gray-400 hover:text-primary transition-colors",
                        isActive("products") && "textprimary"
                    )}
                    href="/products">
                    商品一覧
                </Link>
                <Link href="/cart">
                    <ShoppingCart size={20}/>
                </Link>
                <Link href="/profile">
                    <Avatar className="size-8">
                        <AvatarImage src={imageUrl ?? undefined} alt="ユーザー画像"/>
                        <AvatarFallback>
                            <User size={32}/>
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </div>
    </header>
  )
}

export default Header