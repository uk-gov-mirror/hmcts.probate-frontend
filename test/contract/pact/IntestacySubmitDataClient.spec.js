/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact} = require('@pact-foundation/pact');
const chaiAsPromised = require('chai-as-promised');
const IntestacySubmitData = require('app/services/IntestacySubmitData');
const config = require('app/config');
const getPort = require('get-port');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Pact Intestacy Submit Data', () => {
    // (1) Create the Pact object to represent your provider
    let MOCK_SERVER_PORT;
    let provider;
    getPort().then(portNumber => {
        MOCK_SERVER_PORT = portNumber;
        // (1) Create the Pact object to represent your provider
        provider = new Pact({
            consumer: 'probate_frontend',
            provider: 'probate_orchestrator_service_intestacy_submit',
            port: MOCK_SERVER_PORT,
            log: path.resolve(process.cwd(), 'logs', 'pactIntestacySubmitDataClient.log'),
            dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
            logLevel: 'INFO',
            spec: 2
        });
    });

    const ctx = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        serviceAuthorization: 'someServiceAuthorization'
    };
    // Define expected payloads
    const FORM_DATA_BODY_REQUEST =
        {
            'type': 'Intestacy',
            'applicant': {
                'email': 'someemailaddress@host.com',
                'firstName': 'Jon',
                'lastName': 'Snow',
                'address': {
                    'addressLine1': 'Pret a Manger St.',
                    'addressLine2': 'Georges Hospital',
                    'addressLine3': 'Blackshaw Road',
                    'postTown': 'London',
                    'postCode': 'SW17 0QT',
                    'country': 'United kingdom'
                },
                'postCode': 'SW17 0QT',
                'phoneNumber': '123455678',
                'addressFound': 'Yes',
                'relationshipToDeceased': 'adoptedChild',
                'adoptionInEnglandOrWales': 'Yes'
            },
            'deceased': {
                'firstName': 'Ned',
                'lastName': 'Stark',
                'dob_date': '1930-01-01',
                'dod_date': '2018-01-01',
                'address': {
                    'addressLine1': 'Winterfell',
                    'postTown': 'Westeros',
                    'postCode': 'postcode',
                    'country': 'country'
                },
                'addressFound': 'Yes',
                'postCode': 'SW17 0QT',
                'alias': 'Yes',
                'otherNames': {
                    'name_0': {
                        'lastName': 'North',
                        'firstName': 'King'
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
            'ccdCase': {
                'id': 1535574519543819,
                'state': 'CaseCreated'
            },
            'registry': {
                'name': 'Birmingham',
                'email': 'birmingham@email.com',
                'address': 'Line 1 Bham\nLine 2 Bham\nLine 3 Bham\nPostCode Bham',
                'sequenceNumber': 20075
            },
            'declaration': {
                'declarationCheckbox': 'Yes'
            },
            'payments': [
                {
                    'date': '2018-12-03T15:58:44.954+0000',
                    'amount': 220.5,
                    'siteId': 'P223',
                    'status': 'Success',
                    'method': 'online',
                    'reference': 'RC-1543-8527-2465-2900',
                    'transactionId': 'v5bf26kn5rq9rvdq7gsvn7v11d'
                }
            ],
            'uploadDocumentUrl': 'http://document-management/document/12345'
        };

    function getRequestPayload() {

        const expectedJSON = JSON.parse(JSON.stringify(FORM_DATA_BODY_REQUEST));
        expectedJSON.type = 'Intestacy';
        return expectedJSON;
    }

    function getExpectedPayload() {

        const expectedJSON = JSON.parse(JSON.stringify(FORM_DATA_BODY_REQUEST));
        expectedJSON.ccdCase = {
            'id': 1535574519543819,
            'state': 'PAAppCreated'
        };
        expectedJSON.type = 'Intestacy';
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
    );

    // After each individual test (one or more interactions)
    // we validate that the correct request came through.
    // This ensures what we _expect_ from the provider, is actually
    // what we've asked for (and is what gets captured in the contract)
    afterEach(() => provider.verify());

    describe('when intestacy formdata is posted', () => {
        describe('and is required to be submitted', () => {
            before(() => {
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'probate_orchestrator_service submits intestacy formdata with success',
                    uponReceiving: 'a submit request to POST intestacy formdata',
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
            });

            // (4) write your test(s)
            // Verify service client works as expected
            it('successfully submitted form data', (done) => {
                const submitDataClient = new IntestacySubmitData('http://localhost:' + MOCK_SERVER_PORT, ctx.sessionID);
                const verificationPromise = submitDataClient.submit(FORM_DATA_BODY_REQUEST, ctx);
                expect(verificationPromise).to.eventually.eql(getExpectedPayload()).notify(done);
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
