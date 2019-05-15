'use strict';

const probateJourney = require('app/journeys/probate');
const intestacyJourney = require('app/journeys/intestacy');
const willLeftContent = require('app/resources/en/translation/screeners/willleft');

const isIntestacyJourney = (session) => {
    if (session.caseType) {
        return session.caseType === 'intestacy';
    } else if (session.form && session.form.will && session.form.will.left) {
        return session.form.will.left === willLeftContent.optionNo;
    }
    return false;
};

const setWillLeftFormdata = (session) => {
    if (session.caseType) {
        if (!session.form.will) {
            session.form.will = {};
        }
        if (!session.form.will.left) {
            session.form.will.left = isIntestacyJourney(session) ? willLeftContent.optionNo : willLeftContent.optionYes;
        }
    }
    return session;
};

const setJourney = (req, res, next) => {
    req.session = setWillLeftFormdata(req.session);
    req.session.journey = isIntestacyJourney(req.session) ? intestacyJourney : probateJourney;
    next();
};

const getJourneyName = (session) => {
    if (session.caseType) {
        return session.caseType;
    } else if (session.form && session.form.will && session.form.will.left) {
        return isIntestacyJourney(session) ? 'intestacy' : 'gop';
    }
    return 'gop';
};

module.exports = setJourney;
module.exports.getJourneyName = getJourneyName;
module.exports.isIntestacyJourney = isIntestacyJourney;
module.exports.setWillLeftFormdata = setWillLeftFormdata;
