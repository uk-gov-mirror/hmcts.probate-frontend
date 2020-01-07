'use strict';

const router = require('express').Router();
const config = require('app/config');
const caseTypes = require('app/utils/CaseTypes');

const checkJourneyType = (caseType, req, res, next) => {
    if (req.session.form.type === caseType) {
        next();
    } else {
        res.redirect('/task-list');
    }
};

config.gopOnlyPages.forEach(url => {
    router.get(url, (req, res, next) => checkJourneyType(caseTypes.GOP, req, res, next));
});

config.intestacyOnlyPages.forEach(url => {
    router.get(url, (req, res, next) => checkJourneyType(caseTypes.INTESTACY, req, res, next));
});

module.exports = router;
