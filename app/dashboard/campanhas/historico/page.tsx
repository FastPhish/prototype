"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Download, Eye } from "lucide-react"

export default function HistoricoCampanhasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"todas" | "ativa" | "concluida" | "pausada">("todas")

  const campaigns = [
    {
      id: 1,
      name: "Teste Q4 - Equipe TI",
      status: "Ativa",
      clicks: 12,
      total: 50,
      compromised: 8,
      date: "15/01/2025",
      clickRate: 24,
    },
    {
      id: 2,
      name: "Treinamento RH",
      status: "Concluída",
      clicks: 8,
      total: 30,
      compromised: 5,
      date: "10/01/2025",
      clickRate: 27,
    },
    {
      id: 3,
      name: "Onboarding Novatos",
      status: "Ativa",
      clicks: 4,
      total: 20,
      compromised: 2,
      date: "12/01/2025",
      clickRate: 20,
    },
    {
      id: 4,
      name: "Teste de Segurança - Financeiro",
      status: "Concluída",
      clicks: 18,
      total: 45,
      compromised: 12,
      date: "05/01/2025",
      clickRate: 40,
    },
    {
      id: 5,
      name: "Campanha Dezembro - Vendas",
      status: "Concluída",
      clicks: 22,
      total: 60,
      compromised: 15,
      date: "20/12/2024",
      clickRate: 37,
    },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "todas" || campaign.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-[#506029]/30 text-[#506029]"
      case "Concluída":
        return "bg-gray-500/20 text-gray-400"
      case "Pausada":
        return "bg-[#fbc257]/30 text-[#fbc257]"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getRiskLevel = (clickRate: number) => {
    if (clickRate >= 35) return { label: "Alto", color: "text-[#78170e] bg-[#78170e]/20" }
    if (clickRate >= 20) return { label: "Médio", color: "text-[#fbc257] bg-[#fbc257]/20" }
    return { label: "Baixo", color: "text-[#506029] bg-[#506029]/20" }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Histórico de Campanhas</h1>
            <p className="text-sm text-gray-400 mt-1">Visualize e analise todas as suas campanhas</p>
          </div>
        </div>
        <Button className="bg-[#e2260a] hover:bg-[#78170e] text-white flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exportar Relatório
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1e2937] border-[#2d3748] p-4">
          <div className="text-sm text-gray-400 mb-1">Total de Campanhas</div>
          <div className="text-2xl font-bold text-white">{campaigns.length}</div>
        </Card>
        <Card className="bg-[#1e2937] border-[#2d3748] p-4">
          <div className="text-sm text-gray-400 mb-1">Taxa Média de Cliques</div>
          <div className="text-2xl font-bold text-[#e2260a]">
            {Math.round(campaigns.reduce((acc, c) => acc + c.clickRate, 0) / campaigns.length)}%
          </div>
        </Card>
        <Card className="bg-[#1e2937] border-[#2d3748] p-4">
          <div className="text-sm text-gray-400 mb-1">Usuários Testados</div>
          <div className="text-2xl font-bold text-white">{campaigns.reduce((acc, c) => acc + c.total, 0)}</div>
        </Card>
        <Card className="bg-[#1e2937] border-[#2d3748] p-4">
          <div className="text-sm text-gray-400 mb-1">Dados Comprometidos</div>
          <div className="text-2xl font-bold text-[#78170e]">
            {campaigns.reduce((acc, c) => acc + c.compromised, 0)}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[#1e2937] border-[#2d3748] p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar campanhas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#0f1419] border-[#2d3748] text-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === "todas" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("todas")}
              className={
                filterStatus === "todas"
                  ? "bg-[#e2260a] hover:bg-[#78170e] text-white"
                  : "border-[#2d3748] text-gray-400 hover:text-white hover:bg-white/5"
              }
            >
              Todas
            </Button>
            <Button
              variant={filterStatus === "ativa" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("ativa")}
              className={
                filterStatus === "ativa"
                  ? "bg-[#e2260a] hover:bg-[#78170e] text-white"
                  : "border-[#2d3748] text-gray-400 hover:text-white hover:bg-white/5"
              }
            >
              Ativas
            </Button>
            <Button
              variant={filterStatus === "concluida" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("concluida")}
              className={
                filterStatus === "concluida"
                  ? "bg-[#e2260a] hover:bg-[#78170e] text-white"
                  : "border-[#2d3748] text-gray-400 hover:text-white hover:bg-white/5"
              }
            >
              Concluídas
            </Button>
          </div>
        </div>
      </Card>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => {
          const risk = getRiskLevel(campaign.clickRate)
          return (
            <Card key={campaign.id} className="bg-[#1e2937] border-[#2d3748] hover:border-[#e2260a]/50 transition">
              <div className="p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}
                      >
                        {campaign.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${risk.color}`}>
                        Risco {risk.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{campaign.date}</p>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Cliques</div>
                      <div className="text-lg font-bold text-white">
                        {campaign.clicks}/{campaign.total}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Taxa</div>
                      <div className="text-lg font-bold text-[#e2260a]">{campaign.clickRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Comprometidos</div>
                      <div className="text-lg font-bold text-[#78170e]">{campaign.compromised}</div>
                    </div>
                    <div className="col-span-2 lg:col-span-1 flex items-end">
                      <Link href={`/dashboard/campanhas/historico/${campaign.id}`} className="w-full">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-[#2d3748] text-gray-400 hover:text-white hover:bg-white/5 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Detalhes
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card className="bg-[#1e2937] border-[#2d3748] p-12 text-center">
          <p className="text-gray-400">Nenhuma campanha encontrada</p>
        </Card>
      )}
    </div>
  )
}
