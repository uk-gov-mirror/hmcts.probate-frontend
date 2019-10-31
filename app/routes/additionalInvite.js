'use strict';

const router = require('express').Router();
const AdditionalExecutorInvite = require('app/utils/AdditionalExecutorInvite');

router.post('/', (req, res, next) => {
    AdditionalExecutorInvite.invite(req)
        .then(result => {
            req.session.form.executors = result;
            next();
        })
        .catch(() => {
            res.status(500).render('errors/500');
        });
});

module.exports = router;
