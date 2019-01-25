'use strict';

const probateJourney = require('app/journeys/probate');
const intestacyJourney = require('app/journeys/intestacy');
const willLeftContent = require('app/resources/en/translation/screeners/willleft');

const isIntestacyJourney = (session) => {
    const willLeft = session.willLeft || (session.form && session.form.will && session.form.will.left);
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
    console.log(req.method, req.originalUrl);
    req.session = setWillLeftFormdata(req.session);
    req.session.journey = isIntestacyJourney(req.session) ? intestacyJourney : probateJourney;
    console.log('Is Intestacy: ', isIntestacyJourney(req.session));
    next();
};

module.exports = setJourney;
module.exports.isIntestacyJourney = isIntestacyJourney;
module.exports.setWillLeftFormdata = setWillLeftFormdata;
