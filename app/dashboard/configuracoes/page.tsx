import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { CreditCard, Package } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Configurações</h1>

        <Card className="bg-[#1a1f2e] border-white/10 p-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="pagamento" className="text-gray-300">
                Meio de pagamento:
              </Label>
              <Input
                id="pagamento"
                defaultValue="Cartão terminado em *9280"
                className="mt-2 bg-[#0f1419] border-white/10 text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <Link href="/dashboard/planos" className="block">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Alterar Plano
                </Button>
              </Link>
              <Link href="/dashboard/creditos" className="block">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Comprar créditos
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
