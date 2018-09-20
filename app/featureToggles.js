'use strict';

const router = require('express').Router();
const FeatureToggle = require('app/utils/FeatureToggle');
const featureToggle = new FeatureToggle();

router.get('/applicant-alias', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'applicant-phone',
        featureToggleKey: 'main_applicant_alias',
        callback: featureToggle.togglePage
    });
});
router.get('/applicant-alias-reason', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'applicant-phone',
        featureToggleKey: 'main_applicant_alias',
        callback: featureToggle.togglePage
    });
});
router.get('/summary/*', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        featureToggleKey: 'main_applicant_alias',
        callback: featureToggle.toggleFeature
    });
});
// ---
router.get('/new-start-eligibility', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'start-eligibility',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-will-left', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'will-left',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-will-original', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'will-original',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-death-certificate', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'death-certificate',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-deceased-domicile', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'deceased-domicile',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-applicant-executor', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'applicant-executor',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-mental-capacity', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'mental-capacity',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-iht-completed', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'iht-completed',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
router.get('/new-start-apply', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'start-apply',
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.togglePage
    });
});
// ---
router.get('/start-eligibility', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-start-eligibility',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/will-left', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-will-left',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/will-original', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-will-original',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/death-certificate', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-death-certificate',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/deceased-domicile', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-deceased-domicile',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/applicant-executor', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-applicant-executor',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/mental-capacity', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-mental-capacity',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/iht-completed', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-iht-completed',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
router.get('/start-apply', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        redirectPage: 'new-start-apply',
        featureToggleKey: 'screening_questions_toggle',
        callback: (params) => {
            if (params.isEnabled) {
                params.res.redirect(params.redirectPage);
            } else {
                params.next();
            }
        }
    });
});
// ---
router.get('/tasklist', (req, res, next) => {
    featureToggle.checkToggle({
        req: req,
        res: res,
        next: next,
        featureToggleKey: 'screening_questions_toggle',
        callback: featureToggle.toggleFeature
    });
});

module.exports = router;
