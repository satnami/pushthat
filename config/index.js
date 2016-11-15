var redis = require('redis');

module.exports = {
    port : process.env.PORT || 1337,
    dbConfig : {
        uri: process.env.MONGODB_URI || 'mongodb://localhost/db',
        opts: {}
    },
    queueConfig : {
        type: 'redis',
        redis: redis,
        host: process.env.REDIS_URI || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        password: process.env.REDIS_PASS || null,
        return_buffers: true // to handle binary payloads
    }
};