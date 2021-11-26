'use strict';

const config = require('config');
const {get} = require('lodash');
const featureToggle = require('app/utils/FeatureToggle');

class ScreenerValidation {

    getScreeners(journeyType, session) {
        let exceptedEstates = '';
        if (featureToggle.isEnabled(session.featureToggles, 'ft_excepted_estates')) {
            exceptedEstates = 'ExceptedEstates';
        }
        const deathCertificateNotInEnglish = get(session.form, 'screeners.deathCertificateInEnglish') ? session.form.screeners.deathCertificateInEnglish === 'optionNo' : false;

        return deathCertificateNotInEnglish ? config[`${journeyType}ScreenersDeathCertificateNotInEnglish${exceptedEstates}`] : config[`${journeyType}ScreenersDeathCertificateInEnglish${exceptedEstates}`];
    }
}

module.exports = ScreenerValidation;
