'use strict';

const Service = require('./Service');

class Pdf extends Service {
    post(body, logMessage, headers, url) {
        this.log(logMessage);
        const fetchOptions = this.fetchOptions(body, 'POST', headers);
        return this.fetchBuffer(url, fetchOptions);

    }
}

module.exports = Pdf;
