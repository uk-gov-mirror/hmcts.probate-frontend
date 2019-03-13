/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const ProbateSubmitData = require('app/services/ProbateSubmitData');
const config = require('app/config');

const expect = chai.expect;
const MOCK_SERVER_PORT = 2204;

//let fullForm = require('test/data/FullOriginal');

chai.use(chaiAsPromised);

describe('Pact Probate Submit Data', () => {
    // (1) Create the Pact object to represent your provider
    const provider = new Pact({
        consumer: 'probate_frontend',
        provider: 'probate_orchestrator_service_probate_submit',
        port: MOCK_SERVER_PORT,
        log: path.resolve(process.cwd(), 'logs', 'pact.log'),
        dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
        logLevel: 'INFO',
        spec: 2
    });

    const ctx = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        serviceAuthorization: 'someServiceAuthorization'
    };

    // Define expected payloads
    const FORM_DATA_BODY_REQUEST =
        {
            applicant: {
                email: 'someemailaddress@host.com',
                firstName: 'Jon',
                lastName: 'Snow',
                address: 'Pret a Manger St. Georges Hospital Blackshaw Road London SW17 0QT',
                postCode: 'SW17 0QT',
                phoneNumber: '123455678',
                addressFound: 'Yes',
                freeTextAddress: 'Pret a Manger St. Georges Hospital Blackshaw Road',
                relationshipToDeceased: 'adoptedChild',
                adoptionInEnglandOrWales: 'Yes'
            },
            deceased: {
                firstName: 'Ned',
                lastName: 'Stark',
                dob_date: '1930-01-01',
                dod_date: '2018-01-01',
                address: 'Winterfell, Westeros',
                addressFound: 'Yes',
                postCode: 'SW17 0QT',
                freeTextAddress: 'Winterfell, Westeros',
                alias: 'Yes',
                otherNames: {
                    name_0: {
                        lastName: 'North',
                        firstName: 'King'
                    }
                },
                maritalStatus: 'marriedCivilPartnership',
                divorcedInEnglandOrWales: 'No',
                domiciledInEnglandOrWales: 'Yes',
                spouseNotApplyingReason: 'mentallyIncapable',
                otherChildren: 'Yes',
                allDeceasedChildrenOverEighteen: 'Yes',
                anyDeceasedChildrenDieBeforeDeceased: 'No',
                anyDeceasedGrandchildrenUnderEighteen: 'No',
                anyChildren: 'No'
            },
            iht: {
                form: 'IHT205',
                method: 'Through the HMRC online service',
                netValue: 10000.99,
                grossValue: 10000.99,
                identifier: 'GOT123456'
            },
            assets: {
                assetsOverseasNetValue: 100.99,
                assetsOverseas: 'Yes'
            },
            copies: {
                uk: 5,
                overseas: 6
            },
            registry: {
                name: 'Birmingham',
                email: 'birmingham@email.com',
                address: 'Line 1 Bham\nLine 2 Bham\nLine 3 Bham\nPostCode Bham',
                sequenceNumber: 20075
            },
            declaration: {
                declarationCheckbox: 'Yes'
            },
            uploadDocumentUrl: 'http://document-management/document/12345'
        };

    function getRequestPayload() {

        const expectedJSON = JSON.parse(JSON.stringify(FORM_DATA_BODY_REQUEST));
        expectedJSON.type = 'PA';
        return expectedJSON;
    }

    function getExpectedPayload() {

        const expectedJSON = JSON.parse(JSON.stringify(FORM_DATA_BODY_REQUEST));
        expectedJSON.ccdCase = {
            'id': 1535574519543819,
            'state': 'PAAppCreated'
        };
        expectedJSON.type = 'PA';
        return expectedJSON;
    }

    context('when probate formdata is posted', () => {
        describe('and is required to be submitted', () => {
            before(done => {
                // (2) Start the mock server
                provider
                    .setup()
                    // (3) add interactions to the Mock Server, as many as required
                    .then(() => {
                        return provider.addInteraction({
                            // The 'state' field specifies a 'Provider State'
                            state: 'probate_orchestrator_service submits probate formdata with success',
                            uponReceiving: 'a submit request to POST probate formdata',
                            withRequest: {
                                method: 'POST',
                                path: '/forms/someemailaddress@host.com/submissions',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Session-Id': ctx.sessionID,
                                    'Authorization': ctx.authToken,
                                    'ServiceAuthorization': ctx.serviceAuthorization
                                },
                                body: getRequestPayload()
                            },
                            willRespondWith: {
                                status: 200,
                                headers: {'Content-Type': 'application/json'},
                                body: getExpectedPayload()
                            }
                        });
                    })
                    .then(() => done());
            });

            // (4) write your test(s)
            // Verify service client works as expected
            it('successfully submitted form data', (done) => {
                const submitDataClient = new ProbateSubmitData('http://localhost:2204', ctx.sessionID);
                const verificationPromise = submitDataClient.submit(FORM_DATA_BODY_REQUEST, ctx);
                expect(verificationPromise).to.eventually.eql(getExpectedPayload()).notify(done);
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
