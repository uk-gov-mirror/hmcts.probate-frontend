'use strict';

const ProbatePdf = require('./ProbatePdf');

class ProbateCheckAnswersPdf extends ProbatePdf {
    post(req) {
        const pdfTemplate = this.config.pdf.template.checkAnswers;
        const body = {
            checkAnswersSummary: req.session.checkAnswersSummary
        };
        const logMessage = 'Post probate check answers pdf';
        return super.post(pdfTemplate, body, logMessage, req);
    }
}

module.exports = ProbateCheckAnswersPdf;
