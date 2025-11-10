"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet } from "lucide-react"
import { authService, type User } from "@/lib/auth"
import Link from "next/link"

export default function PerfilPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = authService.getUser()
    setUser(userData)
  }, [])

  if (!user) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Perfil</h1>

        <Card className="bg-[#1a1f2e] border-white/10 p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="auth" className="text-gray-300">
                Autenticação:
              </Label>
              <Input
                id="auth"
                defaultValue="Não há nada ligado ao Google"
                className="mt-2 bg-[#0f1419] border-white/10 text-white"
                disabled
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email:
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={user.email}
                className="mt-2 bg-[#0f1419] border-white/10 text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 items-end">
              <div>
                <Label htmlFor="plano" className="text-gray-300">
                  Plano:
                </Label>
                <Input
                  id="plano"
                  defaultValue={user.plan}
                  className="mt-2 bg-[#0f1419] border-white/10 text-white"
                  disabled
                />
              </div>
              <Link href="/dashboard/creditos">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2 w-full">
                  <Wallet className="w-4 h-4" />
                  <span>Saldo atual: {user.credits} créditos</span>
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
