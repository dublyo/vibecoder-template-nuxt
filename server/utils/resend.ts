import { Resend } from 'resend'

/** Resend email client — only initializes if RESEND_API_KEY is set */
let resend: Resend | null = null

export function useResendServer(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}
