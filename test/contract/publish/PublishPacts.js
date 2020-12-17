'use strict';

/* eslint no-console: 0 */

const path = require('path');
const pact = require('@pact-foundation/pact-node');
const config = require('config');
const git = require('git-rev-sync');
const certPactPath = path.resolve(process.cwd(), 'pactCert');
console.log(certPactPath);
process.env.SSL_CERT_DIR = certPactPath;

const opts = {
    pactFilesOrDirs: [path.resolve(process.cwd(), config.services.pact.pactDirectory)],
    pactBroker: config.pact.pactBrokerUrl,
    consumerVersion: git.short(),
    tags: config.services.pact.tag || 'Dev'
};
pact.publishPacts(opts)
    .then(() => {
        console.log('Pact contract publishing complete!');
    })
    .catch(e => {
        console.log('Pact contract publishing failed: ', e);

    });
