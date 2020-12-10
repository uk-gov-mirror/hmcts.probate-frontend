'use strict';

const router = require('express').Router();
const AdditionalExecutorInvite = require('app/utils/AdditionalExecutorInvite');

router.post('/', (req, res, next) => {
    console.log('!!!!!!!!!!!!!!!!\nreq.authtoken'+req.authToken);
    console.log('req.session.authToken= '+req.session.authToken);
    AdditionalExecutorInvite.invite(req)
        .then(result => {
            req.session.form.executors = result;
            next();
        })
        .catch(err => {
            next(err);
        });
});

module.exports = router;
