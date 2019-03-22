/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const ProbateCheckAnswersPdf = require('app/services/ProbateCheckAnswersPdf');
const config = require('app/config');
const getPort = require('get-port');
const assert = chai.assert;
const expect = chai.expect;
const DOC_BODY_PAYLOAD = require('test/data/pacts/checkAnswersSummary');
const INVALID_DOC_BODY_PAYLOAD = require('test/data/pacts/invalidNoTitleCheckAnswersSummary');

chai.use(chaiAsPromised);

describe('Pact ProbateCheckAnswersPdf', () => {

    let MOCK_SERVER_PORT;
    let provider;
    getPort().then(portNumber => {
        MOCK_SERVER_PORT = portNumber;
        // (1) Create the Pact object to represent your provider
        provider = new Pact({
            consumer: 'probate_frontend',
            provider: 'probate_orchestrator_service_documents_check_answers',
            port: MOCK_SERVER_PORT,
            log: path.resolve(process.cwd(), 'logs', 'pactProbateCheckAnswersPdf.log'),
            dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
            logLevel: 'INFO',
            spec: 2
        });
    });

    const req = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        session: {
            serviceAuthorization: 'someServiceAuthoriz ation',
            checkAnswersSummary: DOC_BODY_PAYLOAD
        }
    };

    const reqInvalid = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        session: {
            serviceAuthorization: 'someServiceAuthoriz ation',
            checkAnswersSummary: INVALID_DOC_BODY_PAYLOAD
        }
    };

    function getWrappedPayload(unwrappedPayload) {
        const fullBody = {
            checkAnswersSummary: unwrappedPayload
        };
        return fullBody;
    }

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

    describe('when valid check answers doc is posted', () => {
        describe('and is required to be downloaded', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'probate_orchestrator_service generates check answers byte[] with success',
                    uponReceiving: 'a request to POST check answers doc',
                    withRequest: {
                        method: 'POST',
                        path: '/documents/generate/checkAnswersSummary',
                        headers: {
                            'Content-Type': 'application/businessdocument+json',
                            'Session-Id': req.sessionID,
                            'Authorization': req.authToken,
                            'ServiceAuthorization': req.session.serviceAuthorization
                        },
                        body: getWrappedPayload(DOC_BODY_PAYLOAD)
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/octet-stream'},
                    }
                })
            );

            it('successfully validated check answers summary', (done) => {
                const checkAnswersPdfClient = new ProbateCheckAnswersPdf('http://localhost:' + MOCK_SERVER_PORT, req.sessionID);
                const verificationPromise = checkAnswersPdfClient.post(req);
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });

    describe('when invalid check answers doc is posted', () => {
        describe('and is required to be downloaded', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'probate_orchestrator_service returns with validation errors',
                    uponReceiving: 'a request to POST check answers doc',
                    withRequest: {
                        method: 'POST',
                        path: '/documents/generate/checkAnswersSummary',
                        headers: {
                            'Content-Type': 'application/businessdocument+json',
                            'Session-Id': reqInvalid.sessionID,
                            'Authorization': reqInvalid.authToken,
                            'ServiceAuthorization': reqInvalid.session.serviceAuthorization
                        },
                        body: getWrappedPayload(INVALID_DOC_BODY_PAYLOAD)
                    },
                    willRespondWith: {
                        status: 400,
                        headers: {'Content-Type': 'application/businessdocument+json;charset=UTF-8'},
                    }
                })
            );
            it('invalid check answers summary', (done) => {
                const checkAnswersPdfClient = new ProbateCheckAnswersPdf('http://localhost:' + MOCK_SERVER_PORT, reqInvalid.sessionID);
                const verificationPromise = checkAnswersPdfClient.post(reqInvalid);
                expect(verificationPromise).to.eventually.be.rejectedWith('Bad Request').notify(done);
            });
        });
    });

    // Write pact files
    after(() => {
        return provider.finalize();
    });

});
