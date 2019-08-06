'use strict';

const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist');
const nock = require('nock');
const config = require('app/config');
const CREATE_PAYMENT_SERVICE_URL = config.services.payment.url + config.services.payment.paths.createPayment;
const IDAM_S2S_URL = config.services.idam.s2s_url;
const PERSISTENCE_URL = config.services.persistence.url;
let sessionData = require('test/data/complete-form-undeclared').formdata;

describe('payment-status', () => {
    let testWrapper;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('PaymentStatus');

        nock(config.services.orchestrator.url)
            .put(uri => uri.includes('submissions'))
            .reply(200, {
                ccdCase: {
                    state: 'CaseCreated'
                }
            });

        nock(CREATE_PAYMENT_SERVICE_URL)
            .get('/1')
            .reply(200, {
                channel: 'Online',
                id: 12345,
                reference: 'PaymentReference12345',
                amount: 5000,
                status: 'Success',
                date_updated: '2018-08-29T15:25:11.920+0000',
                site_id: 'siteId0001',
            });
        nock(PERSISTENCE_URL)
            .post('/')
            .reply(201, {});
        nock(IDAM_S2S_URL)
            .post('/lease')
            .reply(
                200,
                'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJSRUZFUkVOQ0UifQ.Z_YYn0go02ApdSMfbehsLXXbxJxLugPG8v_3ktCpQurK8tHkOy1qGyTo02bTdilX4fq4M5glFh80edDuhDJXPA'
            );
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it.skip('test right content loaded on the page when net value is greater than 5000£', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const excludeKeys = ['paragraph2', 'paragraph3'];
                    testWrapper.testContent(done, excludeKeys);
                });
        });

        it('test right content loaded on the page when net value is less than 5000£', (done) => {
            const excludeKeys = ['paragraph'];

            testWrapper.testContent(done, excludeKeys);
        });

        it(`test it redirects to next page with no input: ${expectedNextUrlForTaskList}`, (done) => {
            sessionData = {};
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testRedirect(done, {}, expectedNextUrlForTaskList);
                });
        });
    });
});
