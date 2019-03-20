/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const ProbateCheckAnswersPdf = require('app/services/ProbateCheckAnswersPdf');
const config = require('app/config');
const assert = chai.assert;
const expect = chai.expect;

const MOCK_SERVER_PORT = 2204;
const DOC_BODY_PAYLOAD = require('test/data/pacts/checkAnswersSummary');
const INVALID_DOC_BODY_PAYLOAD = require('test/data/pacts/invalidNoTitleCheckAnswersSummary');

chai.use(chaiAsPromised);

describe('Pact ProbateCheckAnswersPdf', () => {

    // (1) Create the Pact object to represent your provider
    const provider = new Pact({
        consumer: 'probate_frontend',
        provider: 'probate_orchestrator_service_documents_check_answers',
        port: MOCK_SERVER_PORT,
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
        logLevel: 'INFO',
        spec: 2
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

    context('when check answers doc is posted', () => {
        describe('and is required to be downloaded', () => {
            before(done => {
                // (2) Start the mock server
                provider
                    .setup()
                    // (3) add interactions to the Mock Server, as many as required
                    .then(() => {
                        return provider.addInteraction({
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
                        });
                    })
                    .then(() => done());
            });

            // (4) write your test(s)
            // Verify service client works as expected
            it('successfully validated check answers summary', (done) => {
                const checkAnswersPdfClient = new ProbateCheckAnswersPdf('http://localhost:2204', req.sessionID);
                const verificationPromise = checkAnswersPdfClient.post(req);
                assert.eventually.ok(verificationPromise).notify(done);
            });

            // (6) write the pact file for this consumer-provider pair,
            // and shutdown the associated mock server.
            // You should do this only _once_ per Provider you are testing.
            after(() => {
                return provider.finalize();
            });
        });
    });

    context('when invalid check answers doc is posted', () => {
        describe('and is required to be downloaded', () => {
            before(done => {
                // (2) Start the mock server
                provider
                    .setup()
                    // (3) add interactions to the Mock Server, as many as required
                    .then(() => {
                        return provider.addInteraction({
                            // The 'state' field specifies a 'Provider State'
                            state: 'probate_orchestrator_service returns with validation errors',
                            uponReceiving: 'a request to POST an invalid check answers doc',
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
                                headers: {'Content-Type': 'application/json'},
                                body: {}
                            }
                        });
                    })
                    .then(() => done());
            });

            // (4) write your test(s)
            // Verify service client works as expected
            it('invalid check answers summary', (done) => {
                const checkAnswersPdfClient = new ProbateCheckAnswersPdf('http://localhost:2204', reqInvalid.sessionID);
                const verificationPromise = checkAnswersPdfClient.post(reqInvalid);
                expect(verificationPromise).to.eventually.be.rejectedWith('Bad Request').notify(done);
            });

            // (6) write the pact file for this consumer-provider pair,
            // and shutdown the associated mock server.
            // You should do this only _once_ per Provider you are testing.
            after(() => {
                return provider.finalize();
            });
        });
    });
});
