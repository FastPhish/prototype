"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, CreditCard, Zap, TrendingUp, Shield, X, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { authService } from "@/lib/auth"

interface SavedCard {
  id: string
  lastFour: string
  brand: string
  expiryMonth: string
  expiryYear: string
  holderName: string
  isDefault: boolean
}

export default function CreditosPage() {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card" | "new-card" | null>(null)
  const [processing, setProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [saveCard, setSaveCard] = useState(false)
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    {
      id: "1",
      lastFour: "4532",
      brand: "Visa",
      expiryMonth: "12",
      expiryYear: "26",
      holderName: "JOHN DOE",
      isDefault: true,
    },
  ])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  // Card form state
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const user = authService.getUser()

  const creditPackages = [
    {
      id: 1,
      amount: 50,
      price: 50,
      discount: 0,
      popular: false,
      color: "#3d4961",
    },
    {
      id: 2,
      amount: 100,
      price: 95,
      discount: 5,
      popular: false,
      color: "#506029",
    },
    {
      id: 3,
      amount: 500,
      price: 450,
      discount: 10,
      popular: true,
      color: "#e2260a",
    },
    {
      id: 4,
      amount: 1000,
      price: 850,
      discount: 15,
      popular: false,
      color: "#78170e",
    },
    {
      id: 5,
      amount: 5000,
      price: 4000,
      discount: 20,
      popular: false,
      color: "#fbc257",
    },
  ]

  const handlePurchase = (packageId: number) => {
    setSelectedPackage(packageId)
    setShowPaymentModal(true)
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    return formatted.slice(0, 19)
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4)
    }
    return cleaned
  }

  const deleteCard = (cardId: string) => {
    setSavedCards(savedCards.filter((card) => card.id !== cardId))
  }

  const processPayment = async () => {
    setProcessing(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const selectedPkg = creditPackages.find((pkg) => pkg.id === selectedPackage)
    if (selectedPkg && user) {
      if (saveCard && paymentMethod === "new-card" && cardNumber && cardName) {
        const newCard: SavedCard = {
          id: Date.now().toString(),
          lastFour: cardNumber.replace(/\s/g, "").slice(-4),
          brand: cardNumber.startsWith("4") ? "Visa" : cardNumber.startsWith("5") ? "Mastercard" : "Elo",
          expiryMonth: cardExpiry.split("/")[0],
          expiryYear: cardExpiry.split("/")[1],
          holderName: cardName.toUpperCase(),
          isDefault: savedCards.length === 0,
        }
        setSavedCards([...savedCards, newCard])
      }

      authService.updateUser({
        credits: user.credits + selectedPkg.amount,
      })

      setProcessing(false)
      setPaymentSuccess(true)

      setTimeout(() => {
        setShowPaymentModal(false)
        setPaymentSuccess(false)
        setSelectedPackage(null)
        setPaymentMethod(null)
        setSelectedCard(null)
        setCardNumber("")
        setCardExpiry("")
        setCardCvv("")
        setCardName("")
        setSaveCard(false)
      }, 2000)
    }
  }

  const selectedPkg = creditPackages.find((pkg) => pkg.id === selectedPackage)

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white">Compre Fishhooks</h1>
            <p className="text-gray-400 mt-2">Escolha o pacote ideal para suas campanhas de segurança</p>
          </div>
          <div className="bg-[#3d4961] px-6 py-4 rounded-lg border-2 border-[#506029]">
            <div className="text-sm text-gray-400">Saldo atual</div>
            <div className="text-3xl font-bold text-[#fbc257]">{user?.credits || 0}</div>
            <div className="text-xs text-gray-500">fishhooks disponíveis</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#3d4961] border-[#506029] border-2 p-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#506029] p-2 rounded-lg">
                <Zap className="w-5 h-5 text-[#fbc257]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Ativação Instantânea</h3>
                <p className="text-sm text-gray-400">Créditos disponíveis imediatamente</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#3d4961] border-[#e2260a] border-2 p-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#78170e] p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-[#e2260a]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Descontos Progressivos</h3>
                <p className="text-sm text-gray-400">Quanto mais compra, mais economiza</p>
              </div>
            </div>
          </Card>
          <Card className="bg-[#3d4961] border-[#fbc257] border-2 p-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#506029] p-2 rounded-lg">
                <Shield className="w-5 h-5 text-[#fbc257]" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Pagamento Seguro</h3>
                <p className="text-sm text-gray-400">Transações protegidas e criptografadas</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creditPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative bg-[#3d4961] border-2 p-6 transition-all cursor-pointer hover:scale-105 ${
                pkg.popular
                  ? "border-[#e2260a] shadow-lg shadow-[#e2260a]/20"
                  : "border-gray-700 hover:border-[#fbc257]"
              }`}
              onClick={() => handlePurchase(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e2260a] text-white px-4 py-1 rounded-full text-xs font-bold">
                  MAIS POPULAR
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="inline-block p-4 rounded-full" style={{ backgroundColor: pkg.color + "30" }}>
                  <div
                    className="text-4xl font-bold"
                    style={{ color: pkg.color === "#fbc257" ? pkg.color : "#fbc257" }}
                  >
                    {pkg.amount}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-400 mb-1">Fishhooks</div>
                  {pkg.discount > 0 && (
                    <div className="inline-block bg-[#506029] text-[#fbc257] text-xs px-2 py-1 rounded-full mb-2">
                      Economize {pkg.discount}%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">R$ {pkg.price}</div>
                  <div className="text-sm text-gray-400">R$ {(pkg.price / pkg.amount).toFixed(2)} por fishhook</div>
                </div>

                <Button
                  className={`w-full ${
                    pkg.popular ? "bg-[#e2260a] hover:bg-[#78170e]" : "bg-[#506029] hover:bg-[#78170e]"
                  } text-white font-semibold`}
                >
                  Comprar Agora
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-[#3d4961] border-gray-700 p-6">
          <h3 className="text-xl font-bold text-white mb-4">Perguntas Frequentes</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-[#fbc257] mb-2">O que são Fishhooks?</h4>
              <p className="text-gray-400 text-sm">
                Fishhooks são créditos utilizados para criar e executar campanhas de phishing simulado. Cada campanha
                consome créditos baseado no número de destinatários.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#fbc257] mb-2">Os créditos expiram?</h4>
              <p className="text-gray-400 text-sm">
                Não! Seus fishhooks permanecem disponíveis indefinidamente em sua conta.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#fbc257] mb-2">Posso pagar com PIX?</h4>
              <p className="text-gray-400 text-sm">Sim! Aceitamos PIX e cartão de crédito para sua comodidade.</p>
            </div>
          </div>
        </Card>
      </div>

      {showPaymentModal && selectedPkg && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="bg-[#2d3951] border-gray-700 p-8 max-w-lg w-full relative my-8">
            <button
              onClick={() => {
                setShowPaymentModal(false)
                setSelectedPackage(null)
                setPaymentMethod(null)
                setSelectedCard(null)
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!paymentSuccess ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Finalizar Compra</h2>

                <div className="bg-[#3d4961] p-4 rounded-lg mb-6 border-2 border-[#fbc257]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Pacote:</span>
                    <span className="text-white font-semibold">{selectedPkg.amount} Fishhooks</span>
                  </div>
                  {selectedPkg.discount > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400">Desconto:</span>
                      <span className="text-[#506029] font-semibold">{selectedPkg.discount}%</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                    <span className="text-white font-bold">Total:</span>
                    <span className="text-[#fbc257] font-bold text-xl">R$ {selectedPkg.price}</span>
                  </div>
                </div>

                {!paymentMethod ? (
                  <div className="space-y-4">
                    <p className="text-gray-400 mb-4">Escolha a forma de pagamento:</p>

                    <Button
                      onClick={() => setPaymentMethod("pix")}
                      className="w-full bg-[#506029] hover:bg-[#78170e] text-white h-14 text-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-white p-1 rounded">
                          <div className="w-6 h-6 bg-[#506029]" />
                        </div>
                        Pagar com PIX
                      </div>
                    </Button>

                    {savedCards.length > 0 && (
                      <>
                        <div className="text-sm text-gray-400 mt-6 mb-2">Cartões salvos:</div>
                        {savedCards.map((card) => (
                          <div
                            key={card.id}
                            className={`bg-[#3d4961] border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              selectedCard === card.id ? "border-[#e2260a]" : "border-gray-600 hover:border-[#fbc257]"
                            }`}
                            onClick={() => {
                              setSelectedCard(card.id)
                              setPaymentMethod("card")
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-8 h-8 text-[#fbc257]" />
                                <div>
                                  <div className="text-white font-semibold">
                                    {card.brand} •••• {card.lastFour}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {card.expiryMonth}/{card.expiryYear} • {card.holderName}
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteCard(card.id)
                                }}
                                className="text-gray-400 hover:text-[#e2260a] transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    <Button
                      onClick={() => setPaymentMethod("new-card")}
                      className="w-full bg-[#3d4961] hover:bg-[#2d3951] border-2 border-gray-600 hover:border-[#fbc257] text-white h-14 text-lg"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Adicionar Novo Cartão
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethod === "pix" ? (
                      <div className="text-center space-y-4">
                        <div className="bg-white p-4 rounded-lg inline-block">
                          <div className="w-48 h-48 bg-gradient-to-br from-[#506029] to-[#78170e] flex items-center justify-center">
                            <span className="text-white font-mono text-xs">QR CODE PIX</span>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">Escaneie o QR Code ou copie o código abaixo</p>
                        <div className="bg-[#3d4961] p-3 rounded border border-gray-600 break-all text-xs text-gray-300">
                          00020126580014BR.GOV.BCB.PIX0136{crypto.randomUUID()}520400005303986540{selectedPkg.price}
                          5802BR5913FastPhish6009SAO_PAULO
                        </div>
                        <Button
                          onClick={processPayment}
                          disabled={processing}
                          className="w-full bg-[#506029] hover:bg-[#78170e] text-white"
                        >
                          {processing ? "Processando..." : "Confirmar Pagamento"}
                        </Button>
                      </div>
                    ) : paymentMethod === "card" && selectedCard ? (
                      <div className="space-y-4">
                        <div className="bg-[#3d4961] border-2 border-[#fbc257] rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-8 h-8 text-[#fbc257]" />
                            <div>
                              <div className="text-white font-semibold">
                                {savedCards.find((c) => c.id === selectedCard)?.brand} ••••{" "}
                                {savedCards.find((c) => c.id === selectedCard)?.lastFour}
                              </div>
                              <div className="text-xs text-gray-400">
                                {savedCards.find((c) => c.id === selectedCard)?.holderName}
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">CVV de Segurança</label>
                            <input
                              type="text"
                              placeholder="000"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              className="w-full bg-[#2d3951] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#fbc257] focus:outline-none"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={processPayment}
                          disabled={processing || cardCvv.length !== 3}
                          className="w-full bg-[#e2260a] hover:bg-[#78170e] text-white h-12"
                        >
                          {processing ? "Processando..." : `Pagar R$ ${selectedPkg.price}`}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">Cadastrar Novo Cartão</h3>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Número do Cartão</label>
                          <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="w-full bg-[#3d4961] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#fbc257] focus:outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Validade</label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              maxLength={5}
                              className="w-full bg-[#3d4961] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#fbc257] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">CVV</label>
                            <input
                              type="text"
                              placeholder="000"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                              maxLength={3}
                              className="w-full bg-[#3d4961] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#fbc257] focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-2">Nome no Cartão</label>
                          <input
                            type="text"
                            placeholder="NOME COMPLETO"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            className="w-full bg-[#3d4961] border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-[#fbc257] focus:outline-none"
                          />
                        </div>

                        <div className="flex items-center gap-2 bg-[#3d4961] p-3 rounded-lg border border-gray-600">
                          <input
                            type="checkbox"
                            id="saveCard"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 accent-[#506029]"
                          />
                          <label htmlFor="saveCard" className="text-sm text-gray-400 cursor-pointer">
                            Salvar este cartão para compras futuras
                          </label>
                        </div>

                        <Button
                          onClick={processPayment}
                          disabled={
                            processing ||
                            cardNumber.replace(/\s/g, "").length < 16 ||
                            cardExpiry.length !== 5 ||
                            cardCvv.length !== 3 ||
                            !cardName
                          }
                          className="w-full bg-[#e2260a] hover:bg-[#78170e] text-white h-12"
                        >
                          {processing ? "Processando..." : `Pagar R$ ${selectedPkg.price}`}
                        </Button>
                      </div>
                    )}
                    <Button
                      onClick={() => {
                        setPaymentMethod(null)
                        setSelectedCard(null)
                        setCardNumber("")
                        setCardExpiry("")
                        setCardCvv("")
                        setCardName("")
                        setSaveCard(false)
                      }}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-400 hover:text-white hover:bg-[#3d4961]"
                    >
                      Voltar
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="inline-block bg-[#506029] p-4 rounded-full">
                  <Check className="w-12 h-12 text-[#fbc257]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Pagamento Aprovado!</h3>
                <p className="text-gray-400">Seus {selectedPkg.amount} fishhooks foram adicionados à sua conta.</p>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  )
}
