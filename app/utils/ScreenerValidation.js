'use strict';

const config = require('config');

class ScreenerValidation {

    getScreeners(journeyType, formdata) {
        const deathCertificateNotInEnglish = formdata.screeners && formdata.screeners.deathCertificateInEnglish ? formdata.screeners.deathCertificateInEnglish === 'optionNo' : false;

        return deathCertificateNotInEnglish ? config[`${journeyType}ScreenersDeathCertificateNotInEnglish`] : config[`${journeyType}ScreenersDeathCertificateInEnglish`];
    }
}

module.exports = ScreenerValidation;
