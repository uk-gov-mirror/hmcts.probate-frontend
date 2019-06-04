'use strict';

const ProbatePdf = require('./ProbatePdf');

class ProbateDeclarationPdf extends ProbatePdf {
    post(req) {
        const pdfTemplate = this.config.pdf.template.declaration;
        const logMessage = 'Post probate declaration pdf';
        return super.post(pdfTemplate, req.session.legalDeclaration, logMessage, req);
    }
}

module.exports = ProbateDeclarationPdf;
