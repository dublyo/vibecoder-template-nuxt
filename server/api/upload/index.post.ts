/**
 * File upload handler placeholder.
 * Configure UploadThing by setting the UPLOADTHING_TOKEN env var.
 */
export default defineEventHandler(async () => {
  if (!process.env.UPLOADTHING_TOKEN) {
    throw createError({
      statusCode: 501,
      message: 'UploadThing is not configured',
    })
  }

  // TODO: Implement UploadThing file router
  throw createError({
    statusCode: 501,
    message: 'Not implemented',
  })
})
