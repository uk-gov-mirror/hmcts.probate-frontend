'use strict';

const router = require('express').Router();
const ExecutorsWrapper = require('app/wrappers/Executors');
const services = require('app/components/services');
const logger = require('app/components/logger')();

router.post('/', (req, res, next) => {
    const executorsWrapper = new ExecutorsWrapper(req.session.form.executors);
    const executorsRemoved = executorsWrapper.executorsRemoved();
    const executorsToRemoveFromInviteData = executorsRemoved.concat(executorsWrapper.executorsToRemove());

    if (executorsToRemoveFromInviteData.length > 0) {
        const promises = executorsToRemoveFromInviteData.map(exec => services.removeExecutor(exec.inviteId));
        Promise.all(promises).then(result => {
            const isError = result.some(r => r !== '');
            if (isError) {
                logger.error(`Error while deleting executor from invitedata table: ${result}`);
                throw new Error('Error while deleting executor from invitedata table.');
            }
            req.session.form.executors.list = executorsWrapper.removeExecutorsInviteId();
            delete req.session.form.executors.executorsRemoved;
            next();
        });
    } else {
        next();
    }
});

module.exports = router;
