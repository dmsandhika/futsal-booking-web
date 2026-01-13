'use client'

import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Calendar, Home, Shield } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-border/50 bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Image src="/images/logo.png" alt="FutsalKu Logo" width={48} height={48} />
            </div>
            <span className="text-foreground text-xl font-bold">FutsalKu</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            <Button variant={isActive('/') ? 'default' : 'ghost'} size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Beranda
              </Link>
            </Button>
            <Button variant={isActive('/jadwal') ? 'default' : 'ghost'} size="sm" asChild>
              <Link href="/jadwal" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Cek Jadwal
              </Link>
            </Button>
            <Button variant={isActive('/admin') ? 'default' : 'ghost'} size="sm" asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/jadwal">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <Shield className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
