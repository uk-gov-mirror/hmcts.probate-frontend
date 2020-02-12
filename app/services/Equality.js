'use strict';

const Service = require('./Service');

class Equality extends Service {
    post(data) {
        this.log('Post data to Equality and Diversity service');
        const url = this.endpoint;
        const headers = {
            'Content-Type': 'application/json'
        };
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }
}

module.exports = Equality;
