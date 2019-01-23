'use strict';

const probateJourney = require('app/journeys/probate');
const intestacyJourney = require('app/journeys/intestacy');
const EligibilityCookie = require('app/utils/EligibilityCookie');
const eligibilityCookie = new EligibilityCookie();
const willLeftContent = require('app/resources/en/translation/screeners/willleft');

const isIntestacyJourney = (req) => {
    const willLeft = eligibilityCookie.getAnswer(req, '/will-left', 'left');
    return willLeft === willLeftContent.optionNo;
};

const setWillLeftFormdata = (session) => {
    if (session.willLeft) {
        if (!session.form.will) {
            session.form.will = {};
        }
        if (!session.form.will.left) {
            session.form.will.left = session.willLeft;
        }
    }
    return session;
};

const setJourney = (req, res, next) => {
    req.session = setWillLeftFormdata(req.session);
    req.session.journey = isIntestacyJourney(req) ? intestacyJourney : probateJourney;
    next();
};

module.exports = setJourney;
module.exports.isIntestacyJourney = isIntestacyJourney;
module.exports.setWillLeftFormdata = setWillLeftFormdata;
