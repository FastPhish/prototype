import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, History } from "lucide-react"

export default function CampanhasPage() {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Campanhas</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1f2e] border-white/10 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white">Nova campanha</h2>
            <p className="text-gray-400 text-sm mb-6">Crie uma nova campanha de teste de phishing</p>
            <Link href="/dashboard/campanhas/criar" className="w-full">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Criar</Button>
            </Link>
          </Card>

          <Card className="bg-[#1a1f2e] border-white/10 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mb-4">
              <History className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-xl font-semibold mb-3 text-white">Histórico de campanhas</h2>
            <p className="text-gray-400 text-sm mb-6">Visualize e analise campanhas anteriores</p>
            <Link href="/dashboard/campanhas/historico" className="w-full">
              <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                Consultar
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
