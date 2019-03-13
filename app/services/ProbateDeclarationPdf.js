'use strict';

const ProbatePdf = require('./ProbatePdf');

class ProbateDeclarationPdf extends ProbatePdf {
    post(req) {
        const formdata = req.session.formdata;
        const pdfTemplate = this.config.pdf.template.declaration;
        const body = {
            legalDeclaration: formdata.legalDeclaration
        };
        const logMessage = 'Post probate declaration pdf';
        return super.post(pdfTemplate, body, logMessage, req);
    }
}

module.exports = ProbateDeclarationPdf;
