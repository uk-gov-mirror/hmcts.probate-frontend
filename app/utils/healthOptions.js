'use strict';

const healthcheck = require('@hmcts/nodejs-healthcheck');
const config = require('config');

const healthOptions = function() {
    return {
        callback: (err, res) => {
            if (err) {
                console.log('Health check failed!');
            }
            return res.body.status === 'good' ? healthcheck.up() : healthcheck.down();
        },
        timeout: config.health.timeout,
        deadline: config.health.deadline
    };
};

module.exports = healthOptions;
