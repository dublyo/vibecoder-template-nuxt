import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  const prisma = usePrisma()

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !user.password) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    })
  }

  // Set the user session using nuxt-auth-utils
  await setUserSession(event, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })

  return { message: 'Logged in' }
})
