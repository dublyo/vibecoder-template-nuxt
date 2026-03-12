import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const { token, password } = await readBody(event)

  if (!token || !password || password.length < 8) {
    throw createError({ statusCode: 400, message: 'Invalid input' })
  }

  const prisma = usePrisma()

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (!resetToken || resetToken.expires < new Date()) {
    throw createError({ statusCode: 400, message: 'Invalid or expired reset token' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  await prisma.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  })

  await prisma.passwordResetToken.delete({ where: { id: resetToken.id } })

  return { message: 'Password has been reset' }
})
