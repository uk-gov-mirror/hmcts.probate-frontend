const Step = require('app/core/steps/Step');

module.exports = class SignOut extends Step {

    static getUrl () {
        return '/sign-out';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        delete req.authToken;
        delete req.cookies;
        return ctx;
    }
};
