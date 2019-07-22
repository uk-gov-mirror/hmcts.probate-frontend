'use strict';

const Pdf = require('./Pdf');

class CoverSheetPdf extends Pdf {

    post(req) {
        const formdata = req.session.formdata;
        const pdfTemplate = this.config.pdf.template.coverSheet;
        const body = {
            applicantAddress: formdata.applicant.address,
            caseReference: formdata.ccdCase.id,
            submitAddress: formdata.registry.address
        };
        const logMessage = 'Post probate cover sheet pdf';
        return super.post(pdfTemplate, body, logMessage, req);
    }
}

module.exports = CoverSheetPdf;
