'use strict';

const router = require('express').Router();
const contentDeceasedMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const contentRelationshipToDeceased = require('app/resources/en/translation/applicant/relationshiptodeceased');
const contentIhtMethod = require('app/resources/en/translation/iht/method');

router.get('/documents', (req, res, next) => {
    const session = req.session;

    if (session.caseType === 'intestacy') {
        const sessionForm = session.form;
        const deceasedMarried = (sessionForm.deceased && sessionForm.deceased.maritalStatus === contentDeceasedMaritalStatus.optionMarried);
        const applicantIsChild = (sessionForm.applicant && (sessionForm.applicant.relationshipToDeceased === contentRelationshipToDeceased.optionChild || sessionForm.applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild));
        const documentsUploaded = (sessionForm.documents && sessionForm.documents.uploads && sessionForm.documents.uploads.length);
        const iht205Used = (sessionForm.iht && sessionForm.iht.method === contentIhtMethod.optionPaper && sessionForm.iht.form === 'IHT205');

        if ((deceasedMarried && applicantIsChild) || documentsUploaded || iht205Used) {
            next();
        } else {
            res.redirect('/tasklist');
        }
    } else {
        next();
    }
});

module.exports = router;
