/**
 * Health check endpoint — returns 200 if the app is running.
 * Used by Docker healthchecks, load balancers, and monitoring.
 */
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
})
