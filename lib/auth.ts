"use client"

export interface User {
  email: string
  name: string
  plan: string
  credits: number
}

export const authService = {
  login: (email = "usuario@exemplo.com") => {
    const user: User = {
      email,
      name: email.split("@")[0],
      plan: "Sardinha",
      credits: 50,
    }
    localStorage.setItem("fastphish_user", JSON.stringify(user))
    return user
  },

  logout: () => {
    localStorage.removeItem("fastphish_user")
  },

  getUser: (): User | null => {
    if (typeof window === "undefined") return null
    const user = localStorage.getItem("fastphish_user")
    return user ? JSON.parse(user) : null
  },

  isAuthenticated: (): boolean => {
    return authService.getUser() !== null
  },

  updateUser: (user: User) => {
    localStorage.setItem("fastphish_user", JSON.stringify(user))
  },
}
