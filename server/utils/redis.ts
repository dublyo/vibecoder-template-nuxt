import Redis from 'ioredis'

/** Redis client singleton — Nitro auto-imports from server/utils */
let redis: Redis

export function useRedis(): Redis {
  if (!redis) {
    redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    })
  }
  return redis
}
