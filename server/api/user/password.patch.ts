import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const { currentPassword, newPassword } = await readBody(event)

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    throw createError({ statusCode: 400, message: 'Invalid input' })
  }

  const prisma = usePrisma()
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  if (!user?.password) {
    throw createError({ statusCode: 400, message: 'No password set' })
  }

  const isValid = await bcrypt.compare(currentPassword, user.password)
  if (!isValid) {
    throw createError({ statusCode: 400, message: 'Current password is incorrect' })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashedPassword },
  })

  return { message: 'Password updated' }
})
