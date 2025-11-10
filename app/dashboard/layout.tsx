"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Settings, LogOut, User, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { authService } from "@/lib/auth"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [credits, setCredits] = useState(50)

  useEffect(() => {
    const authenticated = authService.isAuthenticated()
    setIsAuthenticated(authenticated)

    if (!authenticated) {
      router.push("/auth")
    } else {
      const user = authService.getUser()
      setCredits(user?.credits || 50)
    }
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  const navigation = [
    { name: "Perfil", href: "/dashboard/perfil", icon: User },
    { name: "Campanhas", href: "/dashboard/campanhas", icon: LayoutDashboard },
    { name: "Configurações", href: "/dashboard/configuracoes", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex lg:w-64 bg-[#1a1f2e] border-r border-white/10 flex-col fixed h-screen">
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image src="/fastphish-logo.png" alt="FastPhish" width={40} height={40} />
            <span className="text-xl font-bold text-white">FastPhish</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm",
                      isActive ? "bg-[#e2260a] text-white" : "text-gray-300 hover:bg-white/5",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition text-sm w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 overflow-auto bg-[#0f1419]">
        <div className="sticky top-0 z-10 bg-[#1a1f2e] border-b border-white/10 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 lg:hidden">
              <Image src="/fastphish-logo.png" alt="FastPhish" width={32} height={32} />
              <span className="text-lg font-bold text-white">FastPhish</span>
            </div>
            <div className="ml-auto">
              <Link href="/dashboard/creditos">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#2d3748] hover:bg-[#3d4861] rounded-lg transition text-white text-sm">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Saldo atual</span>
                  <span className="font-bold text-[#fbc257]">{credits} créditos</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
