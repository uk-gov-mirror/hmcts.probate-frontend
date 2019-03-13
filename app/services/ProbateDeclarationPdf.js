'use strict';

const ProbatePdf = require('./ProbatePdf');

class ProbateDeclarationPdf extends ProbatePdf {
    post(req) {
        const pdfTemplate = this.config.pdf.template.declaration;
        const body = {
            legalDeclaration: req.session.legalDeclaration
        };
        const logMessage = 'Post probate declaration pdf';
        return super.post(pdfTemplate, body, logMessage, req);
    }
}

module.exports = ProbateDeclarationPdf;
