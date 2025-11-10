"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CriarCampanhaPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate campaign creation
    setTimeout(() => {
      router.push("/dashboard/campanhas/provisionando")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-[#1a1f2e] border-white/10 p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Criação de campanha</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="nome" className="text-gray-300">
                Nome da campanha
              </Label>
              <Input
                id="nome"
                required
                className="mt-2 bg-[#0f1419] border-white/10 text-white"
                placeholder="Ex: Teste Q1 2025"
              />
            </div>

            <div>
              <Label htmlFor="objetivo" className="text-gray-300">
                Objetivo geral
              </Label>
              <Input
                id="objetivo"
                required
                className="mt-2 bg-[#0f1419] border-white/10 text-white"
                placeholder="Ex: Testar conscientização"
              />
            </div>

            <div>
              <Label htmlFor="escolha" className="text-gray-300">
                Escolha de campanha
              </Label>
              <Select>
                <SelectTrigger className="mt-2 bg-[#0f1419] border-white/10 text-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email Phishing</SelectItem>
                  <SelectItem value="sms">SMS Phishing</SelectItem>
                  <SelectItem value="web">Web Phishing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duracao" className="text-gray-300">
                Duração
              </Label>
              <Select>
                <SelectTrigger className="mt-2 bg-[#0f1419] border-white/10 text-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 semana</SelectItem>
                  <SelectItem value="2">2 semanas</SelectItem>
                  <SelectItem value="4">1 mês</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="alvos" className="text-gray-300">
              Alvos
            </Label>
            <Textarea
              id="alvos"
              placeholder="Digite os emails dos alvos, separados por vírgula"
              className="mt-2 min-h-24 bg-[#0f1419] border-white/10 text-white"
              required
            />
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-white/10 text-gray-300 hover:bg-white/5"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white" disabled={isLoading}>
              {isLoading ? "Criando..." : "Continuar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
