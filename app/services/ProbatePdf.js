'use strict';

const Pdf = require('./Pdf');

class ProbatePdf extends Pdf {
    post(pdfTemplate, body, logMessage, req) {
        const headers = {
            'Content-Type': 'application/json',
            'Session-Id': req.sessionID,
            'Authorization': req.authToken,
            'ServiceAuthorization': req.session.serviceAuthorization
        };
        const businessDocumentUrl = this.formatUrl.format(this.endpoint, this.config.pdf.path);
        const url = `${businessDocumentUrl}/${pdfTemplate}`;
        return super.post(body, logMessage, headers, url);
    }
}

module.exports = ProbatePdf;
