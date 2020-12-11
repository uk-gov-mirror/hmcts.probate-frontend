/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact, Matchers} = require('@pact-foundation/pact');
const {somethingLike: term} = Matchers;
const chaiAsPromised = require('chai-as-promised');
const FeeLookupClient = require('app/services/FeesLookup');
const config = require('config');
const getPort = require('get-port');
const assert = chai.assert;
chai.use(chaiAsPromised);
let headers;

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

    describe('when a request for a Fee', () => {
        describe('is required from a GET', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'service is registered in Fee registry',
                    uponReceiving: 'a request to GET a fee',
                    withRequest: {
                        method: 'GET',
                        path: '/fees/lookup',
                        query: 'amount_or_volume=2500000&applicant_type=personal&channel=default&event=issue&jurisdiction1=family&jurisdiction2=probate+registry&service=probate',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json; charset=UTF-8'},
                        body: {
                            fee_amount: term({generate: 250, matcher: '^[0-9]*$'}),
                            code: term({generate: 'FEE0388'}),
                            description: term({generate: 'Originating proceedings where no other fee is specified'}),
                            version: term({generate: 1, matcher: '^[0-9]*$'})
                        }
                    }
                })
            );

            it('successfully returns fee', (done) => {
                const feeLookupClient = new FeeLookupClient('http://localhost:' + MOCK_SERVER_PORT, ctx.sessionID);
                headers = {
                    authToken: ctx.authToken
                };
                const verificationPromise = feeLookupClient.get(issuesData, headers);
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });

    // Write pact files
    after(() => {
        return provider.finalize();
    });

});
