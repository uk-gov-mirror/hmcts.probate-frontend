'use strict';

const FormData = require('./FormData');

class IntestacyFormData extends FormData {

    get(id, authToken, serviceAuthorisation) {
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Get intestacy form data';
        const url = this.endpoint + path +'?probateType='+this.getFormType();

        return super.get(logMessage, url, authToken, serviceAuthorisation);
    }

    post(id, data, ctx) {
        data.type = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Post intestacy form data';
        const url = this.endpoint + path;
        return super.post(data, logMessage, url, ctx);
    }

    getFormType() {
        return 'Intestacy';
    }
}

module.exports = IntestacyFormData;
