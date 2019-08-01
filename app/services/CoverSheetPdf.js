'use strict';

const Pdf = require('./Pdf');
const FormatName = require('app/utils/FormatName');

class CoverSheetPdf extends Pdf {

    post(formdata) {
        const pdfTemplate = this.config.pdf.template.coverSheet;
        const body = {
            bulkScanCoverSheet: {
                applicantAddress: formdata.applicant.address.formattedAddress,
                applicantName: FormatName.format(formdata.applicant),
                caseReference: formdata.ccdCase.id,
                submitAddress: formdata.registry.address
            }
        };
        const logMessage = 'Post cover sheet pdf';
        return super.post(pdfTemplate, body, logMessage);
    }
}

module.exports = CoverSheetPdf;
