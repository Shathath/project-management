const redis = require("redis");

const  { createClient } = redis;

const redisClient = createClient({ port : 6379, host :  "127.0.0.1" });

redisClient.connect().catch(console.error);

module.exports = redisClient;

