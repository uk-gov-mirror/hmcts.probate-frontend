'use strict';

const probateJourney = require('app/journeys/probate');
const intestacyJourney = require('app/journeys/intestacy');

const isIntestacyJourney = (session) => {
    if (session.caseType) {
        return session.caseType === 'intestacy';
    } else if (session.form && session.form.caseType) {
        return session.form.caseType === 'intestacy';
    }
    return false;
};

const setWillLeftFormdata = (session) => {
    if (session.caseType) {
        if (!session.form.caseType) {
            session.form.caseType = isIntestacyJourney(session) ? 'intestacy' : 'gop';
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
    return isIntestacyJourney(session) ? 'intestacy' : 'gop';
};

module.exports = setJourney;
module.exports.getJourneyName = getJourneyName;
module.exports.isIntestacyJourney = isIntestacyJourney;
module.exports.setWillLeftFormdata = setWillLeftFormdata;
