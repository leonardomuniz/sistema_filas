import env from "./env.js";

const { redis } = env;

if (!redis.backoff.type) throw new Error(".env is not complet");

export const BullConfig = {
  redis: redis.url,
  defaultJobOptions: {
    removeOnComplete: redis.removeOnComplete,
    removeOnFail: redis.removeOnFail,
    attempts: redis.attempts,
    backoff: {
      type: redis.backoff.type,
      delay: redis.backoff.delay,
    },
  },
};
