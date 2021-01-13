/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact, Matchers} = require('@pact-foundation/pact');
const {somethingLike, like} = Matchers;
const chaiAsPromised = require('chai-as-promised');
const FeeLookupClient = require('app/services/FeesLookup');
const TestConfigurator = new (require('test/end-to-end/helpers/TestConfigurator'))();
const config = require('config');
const getPort = require('get-port');
const assert = chai.assert;
chai.use(chaiAsPromised);
let headers;
let ftNewFeeEnabled;

// eslint complains that the Before/After are not used but they are by codeceptjs
// so we have to tell eslint to not validate these
// eslint-disable-next-line no-undef
before(async () => {
    await TestConfigurator.initLaunchDarkly();
    await TestConfigurator.getBefore();
    ftNewFeeEnabled = await TestConfigurator.checkFeatureToggle(config.featureToggles.ft_newfee_register_code);
});

// eslint-disable-next-line no-undef
after(() => {
    TestConfigurator.getAfter();
});

describe('Pact FeesRegisterClient', () => {
    let MOCK_SERVER_PORT;
    let provider;
    getPort().then(portNumber => {
        MOCK_SERVER_PORT = portNumber;
        // (1) Create the Pact object to represent your provider
        provider = new Pact({
            consumer: 'probate_frontend',
            provider: 'feeRegister_lookUp',
            port: MOCK_SERVER_PORT,
            log: path.resolve(process.cwd(), 'logs', 'pactFeesRegister.log'),
            dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
            logLevel: 'INFO',
            spec: 2
        });
    });

    const ctx = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        session: {
            serviceAuthorization: 'someServiceAuthorization'
        }
    };

    const issuesData = {
        amount_or_volume: 2500000,
        applicant_type: 'personal',
        channel: 'default',
        event: 'issue',
        jurisdiction1: 'family',
        jurisdiction2: 'probate registry',
        service: 'probate'
    };
    const issuesDataWithKeyWord = {
        amount_or_volume: 2500000,
        applicant_type: 'personal',
        channel: 'default',
        event: 'issue',
        jurisdiction1: 'family',
        jurisdiction2: 'probate registry',
        service: 'probate',
        keyword: 'PA'
    };
    const feeResponseBodyExpectation = {
        fee_amount: like(99.00),
        code: somethingLike('FEE0388'),
        description: somethingLike('Originating proceedings where no other fee is specified'),
        version: like(1),
    };

    // Setup a Mock Server before unit tests run.
    // This server acts as a Test Double for the real Provider API.
    // We then call addInteraction() for each test to configure the Mock Service
    // to act like the Provider
    // It also sets up expectations for what requests are to come, and will fail
    // if the calls are not seen.
    before(() =>
        provider.setup()
    );

    // After each individual test (one or more interactions)
    // we validate that the correct request came through.
    // This ensures what we _expect_ from the provider, is actually
    // what we've asked for (and is what gets captured in the contract)
    afterEach(() => provider.verify());

    function getQueryParams(ftNewFeeEnabled) {
        let queryParams;
        if (ftNewFeeEnabled) {
            queryParams = 'amount_or_volume=2500000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate&keyword=PA';
        } else {
            queryParams = 'amount_or_volume=2500000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate';
        }
        return queryParams;
    }

    describe('when a request for a Fee', () => {
        describe('is required from a GET', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'service is registered in Fee registry',
                    uponReceiving: 'a request to GET a fee',
                    withRequest: {
                        method: 'GET',
                        path: '/fee-register/fees/lookup',
                        query: getQueryParams(ftNewFeeEnabled),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json; charset=UTF-8'},
                        body: feeResponseBodyExpectation
                    }
                })
            );

            it('successfully returns fee', (done) => {
                const feeLookupClient = new FeeLookupClient('http://localhost:' + MOCK_SERVER_PORT + '/fee-register', ctx.sessionID);
                headers = {
                    authToken: ctx.authToken
                };
                let verificationPromise;
                if (ftNewFeeEnabled) {
                    verificationPromise = feeLookupClient.get(issuesDataWithKeyWord, headers);
                } else {
                    verificationPromise = feeLookupClient.get(issuesData, headers);
                }
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });

    // Write pact files
    after(() => {
        return provider.finalize();
    });

});
