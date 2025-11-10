"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function ProvisionandoPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard/campanhas")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-orange-500 animate-spin mx-auto mb-6" />
        <p className="text-xl text-white font-semibold">Provisionando campanha...</p>
        <p className="text-sm text-gray-400 mt-2">Aguarde enquanto configuramos sua campanha</p>
      </div>
    </div>
  )
}
