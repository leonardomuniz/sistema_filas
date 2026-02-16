import "dotenv/config";

const env = {
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    url: process.env.REDIS_URL,
    removeOnComplete: Number(process.env.REDIS_REMOVE_ON_COMPLETE),
    removeOnFail: Number(process.env.REDIS_REMOVE_ON_FAIL),
    attempts: Number(process.env.REDIS_ATTEMPTS),
    backoff: {
      type: process.env.REDIS_BACKOFF_TYPE,
      delay: Number(process.env.REDIS_BACKOFF_DELAY),
    },
  },
};

export default env;
