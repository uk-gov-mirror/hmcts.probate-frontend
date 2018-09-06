'use strict';

const services = require('app/components/services');

class FeatureToggle {
    static getToggle(res, next, redirectPage, featureToggleKey) {
        services.featureToggle(featureToggleKey).then(isEnabled => {
            if (isEnabled === 'true') {
                next();
            } else {
                res.redirect(redirectPage);
            }
        })
        .catch(err => {
            next(err);
        });
    }
}

module.exports = FeatureToggle;
