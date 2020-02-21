'use strict';

const router = require('express').Router();
const os = require('os');
const gitProperties = require('git.properties');
const Healthcheck = require('app/utils/Healthcheck');
const commonContent = require('app/resources/en/translation/common');
const gitRevision = process.env.GIT_REVISION;
const osHostname = os.hostname();
const gitCommitId = gitProperties.git.commit.id;
const config = require('app/config');

router.get('/health', (req, res) => {
    const healthcheck = new Healthcheck();
    const services = [
        {name: config.services.validation.name, url: config.services.validation.url},
        {name: config.services.submit.name, url: config.services.submit.url},
        {name: config.services.orchestrator.name, url: config.services.orchestrator.url},
        {name: config.services.equalityAndDiversity.name, url: config.services.equalityAndDiversity.url}
    ];

    healthcheck.getDownstream(services, healthcheck.health, healthDownstream => {
        return healthcheck.getDownstream(services, healthcheck.info, infoDownstream => {
            res.json({
                name: commonContent.serviceName,
                // status: healthcheck.status(healthDownstream),
                status: 'UP',
                uptime: process.uptime(),
                host: osHostname,
                version: gitRevision,
                gitCommitId,
                downstream: healthcheck.mergeInfoAndHealthData(healthDownstream, infoDownstream)
            });

            return res.end();
        });
    });
});

module.exports = router;
module.exports.osHostname = osHostname;
module.exports.gitCommitId = gitCommitId;
