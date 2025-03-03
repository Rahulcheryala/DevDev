import type { Redis as IoRedisType, RedisOptions as IoRedisOptions } from "ioredis";
import IoRedis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

let redis: IoRedisType;

declare global {
  var __redis: IoRedisType | undefined;
}

if (!REDIS_URL) {
  throw new Error("REDIS_URL is not defined");
}

const config: IoRedisOptions = {
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the Redis with every change either.
if (process.env.NODE_ENV === "production") {
  redis = new IoRedis(REDIS_URL, config);
} else {
  if (!global.__redis) {
    global.__redis = new IoRedis(REDIS_URL, config);
  }
  redis = global.__redis;
}

export default redis;
