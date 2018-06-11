const Step = require('app/core/steps/Step');
const config = require('app/config');
const services = require('app/components/services');
const SECURITY_COOKIE = '__auth-token-' + config.payloadVersion;

module.exports = class SignOut extends Step {

    static getUrl () {
        return '/sign-out';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const access_token = req.cookies[SECURITY_COOKIE];
        if (access_token) {
            services.signOut(access_token);
        }
        delete req.cookies;
        delete req.session;
        return ctx;
    }
};
