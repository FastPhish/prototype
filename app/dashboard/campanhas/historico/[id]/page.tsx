"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Mail,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  Shield,
  TrendingUp,
  Database,
  Eye,
} from "lucide-react"

export default function CampanhaDetalhesPage({ params }: { params: { id: string } }) {
  const { id } = params

  const [expandedSections, setExpandedSections] = useState({
    compromised: true,
    clicked: true,
    notClicked: false,
    timeline: false,
    recommendations: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  // Mock data - substituir por dados reais do backend
  const campaign = {
    id,
    name: "Teste Q4 - Equipe TI",
    status: "Ativa",
    date: "15/01/2025",
    template: "Email Falso do RH",
    clicks: 12,
    total: 50,
    compromised: 8,
    clickRate: 24,
    description: "Campanha de teste de segurança para avaliar conscientização da equipe de TI",
  }

  const detailedStats = [
    { label: "E-mails Enviados", value: campaign.total, icon: Mail, color: "text-blue-400" },
    { label: "Cliques no Link", value: campaign.clicks, icon: AlertTriangle, color: "text-[#fbc257]" },
    { label: "Dados Inseridos", value: campaign.compromised, icon: XCircle, color: "text-[#e2260a]" },
    { label: "Não Clicaram", value: campaign.total - campaign.clicks, icon: CheckCircle2, color: "text-[#506029]" },
  ]

  const compromisedUsers = [
    { name: "João Silva", email: "joao.silva@empresa.com", time: "15/01 14:23", dataEntered: "Senha" },
    { name: "Maria Santos", email: "maria.santos@empresa.com", time: "15/01 15:45", dataEntered: "Senha, CPF" },
    { name: "Pedro Costa", email: "pedro.costa@empresa.com", time: "15/01 16:12", dataEntered: "Senha" },
    { name: "Ana Oliveira", email: "ana.oliveira@empresa.com", time: "16/01 09:30", dataEntered: "Senha, Email" },
    { name: "Carlos Ferreira", email: "carlos.ferreira@empresa.com", time: "16/01 11:15", dataEntered: "Senha" },
    { name: "Juliana Lima", email: "juliana.lima@empresa.com", time: "16/01 13:50", dataEntered: "Senha, CPF, Tel" },
    { name: "Roberto Alves", email: "roberto.alves@empresa.com", time: "17/01 10:20", dataEntered: "Senha" },
    { name: "Fernanda Rocha", email: "fernanda.rocha@empresa.com", time: "17/01 14:40", dataEntered: "Senha, Email" },
  ]

  const clickedUsers = [
    { name: "Lucas Mendes", email: "lucas.mendes@empresa.com", time: "15/01 10:15", action: "Clicou no link" },
    { name: "Patricia Souza", email: "patricia.souza@empresa.com", time: "15/01 11:30", action: "Clicou no link" },
    { name: "Ricardo Dias", email: "ricardo.dias@empresa.com", time: "16/01 08:45", action: "Clicou no link" },
    { name: "Camila Rodrigues", email: "camila.rodrigues@empresa.com", time: "16/01 15:20", action: "Clicou no link" },
  ]

  const notClickedUsers = [
    { name: "Marcos Pereira", email: "marcos.pereira@empresa.com" },
    { name: "Sandra Lima", email: "sandra.lima@empresa.com" },
    { name: "Rafael Santos", email: "rafael.santos@empresa.com" },
  ]

  const timeline = [
    { time: "15/01 09:00", event: "Campanha iniciada", count: 50, icon: Mail, color: "text-blue-400" },
    { time: "15/01 10:15", event: "Primeiros cliques registrados", count: 3, icon: Eye, color: "text-[#fbc257]" },
    {
      time: "15/01 14:23",
      event: "Primeira credencial vazada",
      count: 1,
      icon: AlertTriangle,
      color: "text-[#e2260a]",
    },
    { time: "17/01 14:40", event: "Última interação", count: 12, icon: TrendingUp, color: "text-[#506029]" },
  ]

  const getRiskLevel = (clickRate: number) => {
    if (clickRate >= 35) return { label: "Alto", color: "text-[#78170e] bg-[#78170e]/20" }
    if (clickRate >= 20) return { label: "Médio", color: "text-[#fbc257] bg-[#fbc257]/20" }
    return { label: "Baixo", color: "text-[#506029] bg-[#506029]/20" }
  }

  const risk = getRiskLevel(campaign.clickRate)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/campanhas/historico">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-white">{campaign.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${risk.color}`}>Risco {risk.label}</span>
            </div>
            <p className="text-sm text-gray-400">{campaign.description}</p>
          </div>
        </div>
        <Button className="bg-[#e2260a] hover:bg-[#78170e] text-white flex items-center gap-2 whitespace-nowrap">
          <Download className="w-4 h-4" />
          Exportar
        </Button>
      </div>

      {/* Campaign Info */}
      <Card className="bg-[#1e2937] border-[#2d3748] p-4 lg:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Status</div>
            <div className="text-white font-semibold">{campaign.status}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Data de Criação</div>
            <div className="text-white font-semibold">{campaign.date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Template</div>
            <div className="text-white font-semibold">{campaign.template}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-1">Taxa de Cliques</div>
            <div className="text-[#e2260a] font-bold text-xl">{campaign.clickRate}%</div>
          </div>
        </div>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {detailedStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.label}
              className="bg-[#1e2937] border-[#2d3748] p-4 lg:p-6 hover:border-[#3d4961] transition-colors"
            >
              <Icon className={`w-6 h-6 lg:w-8 lg:h-8 ${stat.color} mb-4`} />
              <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-400">{stat.label}</div>
            </Card>
          )
        })}
      </div>

      <Card className="bg-[#1e2937] border-[#2d3748] overflow-hidden">
        <button
          onClick={() => toggleSection("timeline")}
          className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Linha do Tempo</h2>
          </div>
          {expandedSections.timeline ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.timeline && (
          <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-4">
            {timeline.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#0f1419] rounded-lg">
                  <div className={`p-2 rounded-lg bg-[#2d3748]`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">{item.event}</div>
                    <div className="text-sm text-gray-400">{item.time}</div>
                  </div>
                  <div className="text-2xl font-bold text-white">{item.count}</div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      <Card className="bg-[#1e2937] border-[#e2260a]/30 overflow-hidden">
        <button
          onClick={() => toggleSection("compromised")}
          className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#e2260a]/20">
              <AlertTriangle className="w-6 h-6 text-[#e2260a]" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Usuários Comprometidos</h2>
              <p className="text-sm text-gray-400">Inseriram credenciais na página falsa</p>
            </div>
            <span className="ml-2 px-3 py-1 bg-[#e2260a]/20 text-[#e2260a] rounded-full text-sm font-bold">
              {compromisedUsers.length}
            </span>
          </div>
          {expandedSections.compromised ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.compromised && (
          <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-3">
            {compromisedUsers.map((user, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0f1419] rounded-lg border border-[#e2260a]/20 hover:border-[#e2260a]/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-[#2d3748]">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium truncate">{user.name}</div>
                    <div className="text-sm text-gray-400 truncate">{user.email}</div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{user.time}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#e2260a]/20 text-[#e2260a] rounded-full text-xs font-semibold">
                    <Database className="w-3 h-3" />
                    {user.dataEntered}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="bg-[#1e2937] border-[#fbc257]/30 overflow-hidden">
        <button
          onClick={() => toggleSection("clicked")}
          className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#fbc257]/20">
              <Eye className="w-6 h-6 text-[#fbc257]" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Usuários que Clicaram</h2>
              <p className="text-sm text-gray-400">Clicaram no link mas não inseriram dados</p>
            </div>
            <span className="ml-2 px-3 py-1 bg-[#fbc257]/20 text-[#fbc257] rounded-full text-sm font-bold">
              {clickedUsers.length}
            </span>
          </div>
          {expandedSections.clicked ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.clicked && (
          <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-3">
            {clickedUsers.map((user, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#0f1419] rounded-lg border border-[#fbc257]/20 hover:border-[#fbc257]/40 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-lg bg-[#2d3748]">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white font-medium truncate">{user.name}</div>
                    <div className="text-sm text-gray-400 truncate">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{user.time}</span>
                  </div>
                  <div className="px-3 py-1 bg-[#fbc257]/20 text-[#fbc257] rounded-full text-xs font-semibold">
                    {user.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="bg-[#1e2937] border-[#506029]/30 overflow-hidden">
        <button
          onClick={() => toggleSection("notClicked")}
          className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#506029]/20">
              <Shield className="w-6 h-6 text-[#506029]" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Usuários Seguros</h2>
              <p className="text-sm text-gray-400">Não clicaram no link malicioso</p>
            </div>
            <span className="ml-2 px-3 py-1 bg-[#506029]/20 text-[#506029] rounded-full text-sm font-bold">
              {notClickedUsers.length}
            </span>
          </div>
          {expandedSections.notClicked ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.notClicked && (
          <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-3">
            {notClickedUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-[#0f1419] rounded-lg border border-[#506029]/20 hover:border-[#506029]/40 transition-colors"
              >
                <div className="p-2 rounded-lg bg-[#2d3748]">
                  <CheckCircle2 className="w-5 h-5 text-[#506029]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white font-medium truncate">{user.name}</div>
                  <div className="text-sm text-gray-400 truncate">{user.email}</div>
                </div>
                <div className="px-3 py-1 bg-[#506029]/20 text-[#506029] rounded-full text-xs font-semibold">
                  Seguro
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="bg-[#1e2937] border-[#2d3748] overflow-hidden">
        <button
          onClick={() => toggleSection("recommendations")}
          className="w-full p-4 lg:p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Recomendações de Segurança</h2>
          </div>
          {expandedSections.recommendations ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
        {expandedSections.recommendations && (
          <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-3">
            <div className="flex gap-3 p-4 bg-[#e2260a]/10 border border-[#e2260a]/30 rounded-lg">
              <div className="p-2 rounded-lg bg-[#e2260a]/20 h-fit">
                <AlertTriangle className="w-5 h-5 text-[#e2260a]" />
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Alta taxa de comprometimento</div>
                <div className="text-sm text-gray-400">
                  16% dos usuários inseriram dados sensíveis. Recomendamos treinamento adicional sobre identificação de
                  phishing.
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-[#fbc257]/10 border border-[#fbc257]/30 rounded-lg">
              <div className="p-2 rounded-lg bg-[#fbc257]/20 h-fit">
                <TrendingUp className="w-5 h-5 text-[#fbc257]" />
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Atenção aos setores vulneráveis</div>
                <div className="text-sm text-gray-400">
                  A equipe de TI apresentou vulnerabilidade. Considere sessões de conscientização específicas.
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-[#506029]/10 border border-[#506029]/30 rounded-lg">
              <div className="p-2 rounded-lg bg-[#506029]/20 h-fit">
                <CheckCircle2 className="w-5 h-5 text-[#506029]" />
              </div>
              <div>
                <div className="text-white font-semibold mb-1">Pontos positivos</div>
                <div className="text-sm text-gray-400">
                  76% dos usuários não clicaram no link, demonstrando boa conscientização geral sobre segurança.
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
