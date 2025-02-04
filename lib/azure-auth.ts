import { type Configuration, PublicClientApplication } from "@azure/msal-browser"

const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_CLIENT_ID!,
    authority: `https://${process.env.NEXT_PUBLIC_AZURE_TENANT_NAME}.b2clogin.com/${process.env.NEXT_PUBLIC_AZURE_TENANT_NAME}.onmicrosoft.com/${process.env.NEXT_PUBLIC_AZURE_POLICY_NAME}`,
    knownAuthorities: [`${process.env.NEXT_PUBLIC_AZURE_TENANT_NAME}.b2clogin.com`],
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
}

export const msalInstance = new PublicClientApplication(msalConfig)

