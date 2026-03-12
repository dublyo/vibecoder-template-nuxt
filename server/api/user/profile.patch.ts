export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { name, email } = await readBody(event)
  const prisma = usePrisma()

  if (email && email !== session.user.email) {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      throw createError({ statusCode: 409, message: 'Email already in use' })
    }
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, email },
  })

  return { message: 'Profile updated' }
})
