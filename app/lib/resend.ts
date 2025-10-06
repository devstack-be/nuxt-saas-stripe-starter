import { Resend } from 'resend'

const config = useRuntimeConfig()
export const resend = new Resend(config.ResendApiKey)
