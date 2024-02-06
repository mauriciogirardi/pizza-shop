import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string(),
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true'),
  MODE: z.enum(['production', 'development', 'test']),
})

export const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  throw new Error(`Environments error: ${JSON.stringify(_env.error.format())}`)
}

export const env = _env.data
