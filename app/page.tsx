import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Users, BarChart3, Zap } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f1419]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#1a1f2e]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/fastphish-logo.png" alt="FastPhish" width={50} height={50} className="object-contain" />
            <span className="text-xl font-bold text-white">FastPhish</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#sobre" className="text-gray-300 hover:text-white transition text-sm">
              Sobre
            </Link>
            <Link href="#planos" className="text-gray-300 hover:text-white transition text-sm">
              Planos
            </Link>
            <Link href="/auth">
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">
            Teste a segurança da sua equipe contra phishing
          </h1>
          <p className="text-xl text-gray-400 mb-10 text-pretty max-w-2xl mx-auto">
            Identifique vulnerabilidades antes dos hackers. Crie simulações realistas de phishing e fortaleça a cultura
            de segurança da sua empresa.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
              Começar Agora
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="bg-[#1a1f2e] border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Simulações Autênticas</h3>
            <p className="text-gray-400 text-sm">E-mails indistinguíveis de ataques reais</p>
          </Card>

          <Card className="bg-[#1a1f2e] border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Deploy em Minutos</h3>
            <p className="text-gray-400 text-sm">Configure e lance testes em poucos cliques</p>
          </Card>

          <Card className="bg-[#1a1f2e] border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Insights Acionáveis</h3>
            <p className="text-gray-400 text-sm">Métricas detalhadas de vulnerabilidade</p>
          </Card>

          <Card className="bg-[#1a1f2e] border-white/10 p-6 text-center">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-white font-semibold mb-2">Educação Contínua</h3>
            <p className="text-gray-400 text-sm">Transforme erros em aprendizado</p>
          </Card>
        </div>
      </section>

      {/* Quem somos */}
      <section id="sobre" className="bg-[#1a1f2e] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Quem somos?</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-300 mb-4">
              A <span className="font-bold text-orange-500">FastPhish</span> nasceu da necessidade crítica de proteger
              empresas contra o vetor de ataque mais explorado: <span className="font-bold">o fator humano</span>.
            </p>
            <p className="text-lg text-gray-300">
              Nossa plataforma permite que qualquer organização execute{" "}
              <span className="font-bold">testes de phishing realistas</span>, identifique colaboradores em risco e
              construa uma verdadeira <span className="font-bold">cultura de cibersegurança</span> — sem precisar de uma
              equipe técnica especializada.
            </p>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 bg-[#0f1419]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Planos</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Sardinha */}
            <Card className="bg-[#1a1f2e] border-white/10 text-white p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Sardinha</h3>
                <p className="text-sm text-gray-400">Comece seus primeiros testes de segurança</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white">R$100</div>
                <div className="text-sm text-gray-400">por mês</div>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Até 10 campanhas/mês</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Relatórios essenciais</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Templates pré-configurados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Suporte via email</span>
                </div>
              </div>

              <Button className="w-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Começar teste grátis
              </Button>
            </Card>

            {/* Salmão */}
            <Card className="bg-[#1a1f2e] border-2 border-orange-500 text-white p-8 flex flex-col relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Mais Popular
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Salmão</h3>
                <p className="text-sm text-gray-400">Segurança robusta para equipes médias</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white">R$200</div>
                <div className="text-sm text-gray-400">por mês</div>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Até 50 campanhas/mês</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Analytics avançado com insights</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Editor de templates customizados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Suporte prioritário</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Treinamentos educativos</span>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Começar teste grátis</Button>
            </Card>

            {/* Tubarão */}
            <Card className="bg-[#1a1f2e] border-white/10 text-white p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Tubarão</h3>
                <p className="text-sm text-gray-400">Proteção enterprise sem limites</p>
              </div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-white">R$3.300</div>
                <div className="text-sm text-gray-400">por mês</div>
              </div>

              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Campanhas ilimitadas</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Suite completa de analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>API REST para integração</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Suporte 24/7 dedicado</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Customer Success Manager</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                  <span>Consultoria de segurança</span>
                </div>
              </div>

              <Button className="w-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                Falar com vendas
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-[#1a1f2e]">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2025 FastPhish. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
