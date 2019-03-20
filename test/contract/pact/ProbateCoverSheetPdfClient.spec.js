/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const ProbateCoverSheetPdf = require('app/services/ProbateCoverSheetPdf');
const config = require('app/config');
const assert = chai.assert;

const MOCK_SERVER_PORT = 2206;
const DOC_BODY_PAYLOAD = require('test/data/pacts/coverSheet');

chai.use(chaiAsPromised);

describe('Pact ProbateCoverSheetPdf', () => {

    // (1) Create the Pact object to represent your provider
    const provider = new Pact({
        consumer: 'probate_frontend',
        provider: 'probate_orchestrator_service_documents_cover_sheet',
        port: MOCK_SERVER_PORT,
        log: path.resolve(process.cwd(), 'logs', 'pactProbateCoverSheetPdf.log'),
        dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
        logLevel: 'INFO',
        spec: 2
    });

    const req = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        session: {
            serviceAuthorization: 'someServiceAuthorization',
            formdata: {
                applicant: {address: 'addressLine1'},
                ccdCase: {id: '123454'},
                registry: {address: 'manchester'}
            }
        }
    };

    function getRequestBody() {
        const fullBody = {
            bulkScanCoverSheet: DOC_BODY_PAYLOAD
        };
        return fullBody;
    }

    context('when cover sheet doc is posted', () => {
        describe('and is required to be downloaded', () => {
            before(done => {
                // (2) Start the mock server
                provider
                    .setup()
                    // (3) add interactions to the Mock Server, as many as required
                    .then(() => {
                        return provider.addInteraction({
                            // The 'state' field specifies a 'Provider State'
                            state: 'probate_orchestrator_service generates cover sheet byte[] with success',
                            uponReceiving: 'a request to POST cover sheet doc',
                            withRequest: {
                                method: 'POST',
                                path: '/documents/generate/bulkScanCoversheet',
                                headers: {
                                    'Content-Type': 'application/businessdocument+json',
                                    'Session-Id': req.sessionID,
                                    'Authorization': req.authToken,
                                    'ServiceAuthorization': req.session.serviceAuthorization
                                },
                                body: getRequestBody()
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
            it('successfully validated form data', (done) => {
                const coverSheetPdfClient = new ProbateCoverSheetPdf('http://localhost:2206', req.sessionID);
                const verificationPromise = coverSheetPdfClient.post(req);
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
});
