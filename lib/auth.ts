import { msalInstance } from "./azure-auth"

export async function signUp(email: string, password: string, fullName: string, city: string) {
  try {
    const result = await msalInstance.loginPopup({
      scopes: ["openid", "profile"],
      prompt: "create",
    })

    // Aquí puedes manejar el resultado de la autenticación
    console.log(result)

    // Luego, puedes hacer una llamada a tu API para guardar la información adicional del usuario
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullName, city }),
    })

    if (!response.ok) {
      throw new Error("Error al guardar la información del usuario")
    }

    return result.account
  } catch (error) {
    console.error("Error en el registro:", error)
    throw error
  }
}

export async function signIn(email: string, password: string) {
  try {
    const result = await msalInstance.loginPopup({
      scopes: ["openid", "profile"],
      prompt: "select_account",
    })

    return result.account
  } catch (error) {
    console.error("Error en el inicio de sesión:", error)
    throw error
  }
}

export async function signOut() {
  try {
    await msalInstance.logoutPopup()
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    throw error
  }
}

export async function createUser(email: string, fullName: string, city: string) {
  // Esta función ahora solo guardará la información adicional del usuario
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, fullName, city }),
  })

  if (!response.ok) {
    throw new Error("Error al guardar la información del usuario")
  }

  return response.json()
}

