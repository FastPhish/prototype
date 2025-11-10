"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { authService } from "@/lib/auth"

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const currentUser = authService.getUser()
  const currentPlan = currentUser?.plan || "Sardinha"

  const handleChangePlan = (planName: string) => {
    setSelectedPlan(planName)
    if (currentUser) {
      const updatedUser = { ...currentUser, plan: planName }
      authService.updateUser(updatedUser)
    }

    // Show success message
    setTimeout(() => {
      alert(`Plano alterado para ${planName} com sucesso!`)
      setSelectedPlan(null)
    }, 500)
  }

  const plans = [
    {
      name: "Sardinha",
      description: "Comece seus primeiros testes de segurança",
      price: "R$100,00",
      features: ["Até 10 campanhas/mês", "Relatórios essenciais", "Templates pré-configurados", "Suporte via email"],
    },
    {
      name: "Salmão",
      description: "Segurança robusta para equipes médias",
      price: "R$200,00",
      popular: true,
      features: [
        "Até 50 campanhas/mês",
        "Analytics avançado com insights",
        "Editor de templates customizados",
        "Suporte prioritário",
        "Treinamentos educativos",
      ],
    },
    {
      name: "Tubarão",
      description: "Proteção enterprise sem limites",
      price: "R$3.300,00",
      features: [
        "Campanhas ilimitadas",
        "Suite completa de analytics",
        "API REST para integração",
        "Suporte 24/7 dedicado",
        "Customer Success Manager",
        "Consultoria de segurança",
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/perfil">
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Alterar plano</h1>
          <p className="text-sm text-gray-400 mt-1">Escolha o plano ideal para sua equipe</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.name
          const isPending = selectedPlan === plan.name

          return (
            <Card
              key={plan.name}
              className={`bg-white p-6 flex flex-col transition ${
                plan.popular ? "border-2 border-[#e2260a] relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e2260a] text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Mais Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{`Plano "${plan.name}"`}</h3>
              <p className="text-sm text-gray-600 mb-4 flex-grow">{plan.description}</p>

              <div className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#e2260a] flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="text-3xl font-bold mb-4">{plan.price}</div>

              {isCurrentPlan ? (
                <Button className="w-full bg-[#2d3951] hover:bg-[#3d4961] text-white" disabled>
                  Plano atual
                </Button>
              ) : (
                <Button
                  className="w-full bg-[#e2260a] hover:bg-[#78170e] text-white"
                  onClick={() => handleChangePlan(plan.name)}
                  disabled={isPending}
                >
                  {isPending ? "Processando..." : "Mudar de plano"}
                </Button>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
