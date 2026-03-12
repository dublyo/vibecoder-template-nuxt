import crypto from 'node:crypto'

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  if (!email) {
    throw createError({ statusCode: 400, message: 'Email is required' })
  }

  const prisma = usePrisma()
  const user = await prisma.user.findUnique({ where: { email } })

  // Always return success to prevent email enumeration
  if (!user) {
    return { message: 'If an account exists, a reset link has been sent.' }
  }

  await prisma.passwordResetToken.deleteMany({ where: { email } })

  const token = crypto.randomBytes(32).toString('hex')
  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires: new Date(Date.now() + 3600 * 1000),
    },
  })

  const config = useRuntimeConfig()
  const resetUrl = `${config.public.appUrl || 'http://localhost:3000'}/reset-password?token=${token}`

  const resend = useResendServer()
  if (resend) {
    await resend.emails.send({
      from: config.emailFrom || 'noreply@example.com',
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link expires in 1 hour.</p>`,
    })
  } else {
    console.log(`[Dev] Password reset link: ${resetUrl}`)
  }

  return { message: 'If an account exists, a reset link has been sent.' }
})
