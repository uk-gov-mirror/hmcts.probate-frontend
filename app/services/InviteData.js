'use strict';

const Service = require('./Service');

class InviteData extends Service {

    setAgreedFlag(formdataId, data, ctx) {
        this.log('Set agreed flag invite data');
        const url = this.formatUrl.format(this.endpoint, `/invite/agreed/${formdataId}`);
        const headers = this.constructHeaders(ctx);
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    resetAgreedFlag(formdataId, ctx) {
        this.log('Reset agreed flag invite data');
        const url = this.formatUrl.format(this.endpoint, `/invite/resetAgreed/${formdataId}`);
        const headers = this.constructHeaders(ctx);
        const fetchOptions = this.fetchOptions({}, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    updateContactDetails(formdataId, data, ctx) {
        this.log('Update contact details invite data');
        const url = this.formatUrl.format(this.endpoint, `/invite/contactdetails/${formdataId}`);
        const headers = this.constructHeaders(ctx);
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchText(url, fetchOptions);
    }

    delete(formdataId, data, req) {
        this.log('delete invite data');
        const url = this.formatUrl.format(this.endpoint, `/invite/delete/${formdataId}`);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': req.authToken,
            'ServiceAuthorization': req.session.serviceAuthorization
        };
        const fetchOptions = this.fetchOptions(data, 'POST', headers);
        return this.fetchJson(url, fetchOptions);
    }

    constructHeaders(ctx) {
        return {
            'Content-Type': 'application/json',
            'Authorization': ctx.authToken,
            'ServiceAuthorization': ctx.serviceAuthorization
        };
    }
}

module.exports = InviteData;
