import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata = {
  title: "Sign in",
  description: "Sign in to your YEEZY account.",
} as Metadata

export default function Login() {
  return <LoginTemplate />
}
