const redis = require('redis');
const { REDIS_CONF } = require('../conf/db');
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', err => {
    console.error(err);
});

const setCache = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val, redis.print);
};

const getCache = key => new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
        if (err) {
            reject(err);
            return;
        }
        if (val == null) {
            resolve(val);
            return;
        }

        try {
            resolve(JSON.parse(val));
        } catch (ex) {
            resolve(val);
        }
    });
});

module.exports = {
    setCache,
    getCache,
};