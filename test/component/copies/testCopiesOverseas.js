'use strict';

const TestWrapper = require('test/util/TestWrapper');
const CopiesSummary = require('app/steps/ui/copies/summary');
const testCommonContent = require('test/component/common/testCommonContent.js');
const config = require('config');
const orchestratorServiceUrl = config.services.orchestrator.url;
const nock = require('nock');
const invitesAllAgreedNock = () => {
    nock(orchestratorServiceUrl)
        .get('/invite/allAgreed/1234567890123456')
        .reply(200, 'true');
};
const sessionData = {
    declaration: {
        declarationCheckbox: 'true'
    }
};

describe('copies-overseas', () => {
    let testWrapper;
    const expectedNextUrlForCopiesSummary = CopiesSummary.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('CopiesOverseas');
    });

    afterEach(() => {
        nock.cleanAll();
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('CopiesOverseas', null, null, [], false, {ccdCase: {state: 'CaseCreated'}, declaration: {declarationCheckbox: 'true'}});

        it.skip('test right content loaded on the page with the ft_fees_api toggle ON', (done) => {
            invitesAllAgreedNock();
            nock('https://app.launchdarkly.com/')
                .get('*')
                .reply(200, true);

            const sessionData = require('test/data/copiesUk');
            sessionData.ccdCase = {
                state: 'Pending',
                id: 1234567890123456
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    delete require.cache[require.resolve('test/data/copiesUk')];
                    const contentToExclude = [
                        'questionOld',
                        'paragraph1Old'
                    ];

                    testWrapper.testContent(done, {}, contentToExclude);
                });
        });

        it.skip('test right content loaded on the page with the ft_fees_api toggle OFF', (done) => {
            invitesAllAgreedNock();
            nock('https://app.launchdarkly.com/')
                .get('*')
                .reply(200, false);

            const sessionData = require('test/data/copiesUk');
            sessionData.ccdCase = {
                state: 'Pending',
                id: 1234567890123456
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    delete require.cache[require.resolve('test/data/copiesUk')];
                    const contentToExclude = [
                        'paragraph1',
                        'bullet1',
                        'bullet2',
                        'copies'
                    ];

                    testWrapper.testContent(done, {}, contentToExclude);
                });
        });

        it('test errors message displayed for invalid data, text values', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: 'abcd'};

                    testWrapper.testErrors(done, data, 'invalid');
                });
        });

        it('test errors message displayed for invalid data, special characters', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: '//1234//'};

                    testWrapper.testErrors(done, data, 'invalid');
                });
        });

        it('test errors message displayed for missing data, nothing entered', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: ''};

                    testWrapper.testErrors(done, data, 'required');
                });
        });

        it('test errors message displayed for invalid data, negative numbers', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: '-1'};

                    testWrapper.testErrors(done, data, 'invalid');
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForCopiesSummary}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: '0'};

                    testWrapper.testRedirect(done, data, expectedNextUrlForCopiesSummary);
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForCopiesSummary}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {overseas: '1'};

                    testWrapper.testRedirect(done, data, expectedNextUrlForCopiesSummary);
                });
        });
    });
});
