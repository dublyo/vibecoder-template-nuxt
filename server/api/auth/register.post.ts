import bcrypt from 'bcryptjs'
import { z } from 'zod'

/** Validation schema for registration input */
const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const result = registerSchema.safeParse(body)
  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.issues[0]?.message ?? 'Validation failed',
    })
  }

  const { name, email, password } = result.data
  const prisma = usePrisma()

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: 'Email already registered',
    })
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return { message: 'Account created' }
})
