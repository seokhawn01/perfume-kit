'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

const navItems = [
  { title: '홈', href: '/' },
  { title: '향수 탐색', href: '/explore' },
  { title: 'TPO 추천', href: '/recommend' },
  { title: '착향 일지', href: '/wear-log' },
  { title: '마이페이지', href: '/mypage' },
]

const authItems = [
  { title: '로그인', href: '/login' },
  { title: '회원가입', href: '/signup' },
]

interface MobileNavProps {
  onClose: () => void
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-3 pt-6">
      <div className="px-2">
        <h2 className="mb-2 px-2 text-lg font-semibold">메뉴</h2>
        <Separator className="mb-4" />
        <div className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md px-2 py-1.5 text-sm leading-none font-medium no-underline transition-colors outline-none select-none',
                pathname === item.href ? 'bg-accent text-accent-foreground' : ''
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          {authItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block rounded-md px-2 py-1.5 text-sm leading-none font-medium no-underline transition-colors outline-none select-none',
                pathname === item.href ? 'bg-accent text-accent-foreground' : ''
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
