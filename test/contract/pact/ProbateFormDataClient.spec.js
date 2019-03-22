/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const ProbateFormData = require('app/services/ProbateFormData');
const config = require('app/config');
const expect = chai.expect;
const getPort = require('get-port');


chai.use(chaiAsPromised);

describe('Pact ProbateFormData', () => {

    let MOCK_SERVER_PORT;
    let provider;
    // (1) Create the Pact object to represent your provider
    getPort().then(portNumber => {
        MOCK_SERVER_PORT = portNumber;
        // (1) Create the Pact object to represent your provider
        provider = new Pact({
            consumer: 'probate_frontend',
            provider: 'probate_orchestrator_service_probate_forms',
            port: MOCK_SERVER_PORT,
            log: path.resolve(process.cwd(), 'logs', 'pactProbateFormData.log'),
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

    // Define expected payloads
    const FORM_DATA_BODY_PAYLOAD =
        {
            'applicant': {
                'email': 'someemailaddress@host.com',
                'firstName': 'Jon',
                'lastName': 'Snow',
                'address': 'Pret a Manger St. Georges Hospital Blackshaw Road London SW17 0QT',
                'postCode': 'SW17 0QT',
                'phoneNumber': '123455678',
                'addressFound': 'Yes',
                'freeTextAddress': 'Pret a Manger St. Georges Hospital Blackshaw Road',
                'adoptionInEnglandOrWales': 'Yes'
            },
            'deceased': {
                'firstName': 'Ned',
                'lastName': 'Stark',
                'dob_date': '1930-01-01',
                'dod_date': '2018-01-01',
                'address': 'Winterfell, Westeros',
                'addressFound': 'Yes',
                'postCode': 'SW17 0QT',
                'freeTextAddress': 'Winterfell, Westeros',
                'alias': 'Yes',
                'allDeceasedChildrenOverEighteen': 'Yes',
                'anyDeceasedChildrenDieBeforeDeceased': 'No',
                'anyDeceasedGrandchildrenUnderEighteen': 'No',
                'anyChildren': 'No'
            }
        };

    function getRequestBody() {
        const fullBody = JSON.parse(JSON.stringify(FORM_DATA_BODY_PAYLOAD));
        fullBody.type = 'PA';
        return fullBody;
    }

    function getExpectedResponseBody() {

        const expectedJSON = JSON.parse(JSON.stringify(FORM_DATA_BODY_PAYLOAD));
        expectedJSON.ccdCase = {
            'id': 1535574519543819,
            'state': 'Draft'
        };
        expectedJSON.type = 'PA';
        return expectedJSON;
    }

    // Setup a Mock Server before unit tests run.
    // This server acts as a Test Double for the real Provider API.
    // We then call addInteraction() for each test to configure the Mock Service
    // to act like the Provider
    // It also sets up expectations for what requests are to come, and will fail
    // if the calls are not seen.
    before(() =>
        provider.setup()
    )

    // After each individual test (one or more interactions)
    // we validate that the correct request came through.
    // This ensures what we _expect_ from the provider, is actually
    // what we've asked for (and is what gets captured in the contract)
    afterEach(() => provider.verify())

    context('when formdata is requested', () => {
        describe('from a GET', () => {
            before(() => {
                // (2) Start the mock server
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'probate_orchestrator_service gets formdata with success',
                    uponReceiving: 'a request to GET probate formdata',
                    withRequest: {
                        method: 'GET',
                        path: '/forms/someemailaddress@host.com',
                        query: 'probateType=PA',
                        headers: {
                            'Content-Type': 'application/json',
                            'Session-Id': ctx.sessionID,
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: getExpectedResponseBody()
                    }
                })
            })

            // (4) write your test(s)
            // Verify service client works as expected
            it('successfully get form data', (done) => {
                const formDataClient = new ProbateFormData('http://localhost:' + MOCK_SERVER_PORT, 'someSessionId');
                const verificationPromise = formDataClient.get('someemailaddress@host.com', ctx.authToken, ctx.serviceAuthorization);
                expect(verificationPromise).to.eventually.eql(getExpectedResponseBody()).notify(done);
            });

        });
    });

    context('when probate formdata is posted', () => {
        describe('and is required to be persisted', () => {
            before(() => {
                // (2) Start the mock server
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'probate_orchestrator_service persists probate formdata with success',
                    uponReceiving: 'a request to POST probate formdata',
                    withRequest: {
                        method: 'POST',
                        path: '/forms/someemailaddress@host.com',
                        headers: {
                            'Content-Type': 'application/json',
                            'Session-Id': 'someSessionId',
                            'Authorization': 'authToken',
                            'ServiceAuthorization': 'someServiceAuthorization'
                        },
                        body: getRequestBody()
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: getExpectedResponseBody()
                    }
                })
            })

            // (4) write your test(s)
            // Verify service client works as expected
            it('successfully validated form data', (done) => {
                const formDataClient = new ProbateFormData('http://localhost:' + MOCK_SERVER_PORT, 'someSessionId');
                const verificationPromise = formDataClient.post('someemailaddress@host.com', FORM_DATA_BODY_PAYLOAD, ctx);
                expect(verificationPromise).to.eventually.eql(getExpectedResponseBody()).notify(done);
            });
        });
    });
    // (6) write the pact file for this consumer-provider pair,
    // and shutdown the associated mock server.
    // You should do this only _once_ per Provider you are testing.
    after(() => {
        return provider.finalize();
    });
});
