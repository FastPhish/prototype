import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, TrendingUp, Users, Mail, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    { label: "Campanhas Ativas", value: "3", icon: Mail, color: "text-[#e2260a]" },
    { label: "Taxa de Cliques", value: "24%", icon: TrendingUp, color: "text-[#506029]" },
    { label: "Usuários Testados", value: "147", icon: Users, color: "text-blue-400" },
    { label: "Créditos Restantes", value: "50", icon: BarChart3, color: "text-[#fbc257]" },
  ]

  const recentCampaigns = [
    { id: 1, name: "Teste Q4 - Equipe TI", status: "Ativa", clicks: 12, total: 50, date: "15/01/2025" },
    { id: 2, name: "Treinamento RH", status: "Concluída", clicks: 8, total: 30, date: "10/01/2025" },
    { id: 3, name: "Onboarding Novatos", status: "Ativa", clicks: 4, total: 20, date: "12/01/2025" },
  ]

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-sm lg:text-base text-gray-400">Visão geral das suas campanhas de phishing</p>
        </div>
        <Link href="/dashboard/campanhas/criar">
          <Button className="bg-[#e2260a] hover:bg-[#78170e] text-white flex items-center gap-2 w-full sm:w-auto">
            <Plus className="w-5 h-5" />
            Nova Campanha
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-[#1e2937] border-[#2d3748] p-4 lg:p-6 hover:border-[#e2260a]/50 transition"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color}`} />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-400">{stat.label}</div>
            </Card>
          )
        })}
      </div>

      <Card className="bg-[#1e2937] border-[#2d3748] p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-bold text-white">Campanhas Recentes</h2>
          <Link href="/dashboard/campanhas/historico">
            <Button variant="ghost" className="text-[#e2260a] hover:text-[#78170e] hover:bg-[#e2260a]/10 text-sm">
              Ver todas
            </Button>
          </Link>
        </div>

        <div className="space-y-3 lg:space-y-4">
          {recentCampaigns.map((campaign) => (
            <Link key={campaign.id} href={`/dashboard/campanhas/historico/${campaign.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 lg:p-4 bg-[#0f1419] rounded-lg hover:bg-[#1e2937] transition cursor-pointer border border-transparent hover:border-[#e2260a]/30">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold mb-1 truncate">{campaign.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-400">{campaign.date}</p>
                </div>
                <div className="flex items-center gap-4 lg:gap-8 text-xs lg:text-sm">
                  <div>
                    <span className="text-gray-400">Cliques: </span>
                    <span className="text-white font-semibold">
                      {campaign.clicks}/{campaign.total}
                    </span>
                  </div>
                  <div
                    className={`px-2 lg:px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      campaign.status === "Ativa" ? "bg-[#506029]/30 text-[#506029]" : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {campaign.status}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
