/**
 * The following example is for Pact version 5
 */
const path = require('path');
const chai = require('chai');
const {Pact, Matchers} = require('@pact-foundation/pact');
// Alias flexible matchers for simplicity
const {somethingLike, like, eachLike} = Matchers;
const chaiAsPromised = require('chai-as-promised');
const PaymentClient = require('app/services/Payment');
const config = require('config');
const getPort = require('get-port');
const assert = chai.assert;
chai.use(chaiAsPromised);

describe('Pact PaymentClient', () => {

    let MOCK_SERVER_PORT;
    let provider;
    getPort().then(portNumber => {
        MOCK_SERVER_PORT = portNumber;
        // (1) Create the Pact object to represent your provider
        provider = new Pact({
            consumer: 'probate_frontend',
            provider: 'payment_cardPayment',
            port: MOCK_SERVER_PORT,
            log: path.resolve(process.cwd(), 'logs', 'pactPayment.log'),
            dir: path.resolve(process.cwd(), config.services.pact.pactDirectory),
            logLevel: 'INFO',
            spec: 2
        });
    });

    const ctx = {
        sessionID: 'someSessionId',
        authToken: 'authToken',
        userId: 'userId',
        reference: '654321ABC',
        session: {
            serviceAuthorization: 'someServiceAuthorization'
        }
    };

    const data = {
        authToken: ctx.authToken,
        serviceAuthToken: ctx.session.serviceAuthorization,
        userId: ctx.userId,
        paymentId: ctx.reference,
        caseId: '1234567891011123'
    };

    const paymentBodyExpectation = {
        channel: somethingLike('online'),
        amount: like(99.00),
        ccd_case_number: somethingLike('1535395401245028'),
        reference: somethingLike('RC-1519-9028-2432-0001'),
        status: somethingLike('Initiated'),
        site_id: somethingLike('siteId0001'),
        external_reference: somethingLike('23459BC')
    };

    const paymentPostedExpectation = {
        reference: somethingLike('RC-1519-9028-2432-0001'),
        external_reference: somethingLike('e2kkddts5215h9qqoeuth5c0v'),
        status: somethingLike('Initiated'),
        date_created: somethingLike('2020-12-11T15:40:40.079+0000')
    };

    const paymentFeesBodyExpectation = {
        amount: like(219.50),
        ccd_case_number: somethingLike('1234567891011123'),
        payment_reference: somethingLike('RC-1519-9028-2432-0001'),
        status: somethingLike('Success')
    };

    const createPaymentData = {
        amount: 300.00,
        authToken: ctx.authToken,
        serviceAuthToken: ctx.session.serviceAuthorization,
        userId: ctx.userId,
        applicationFee: 12.50,
        copies: {
            uk: {
                number: 1,
                cost: 1.50
            },
            overseas: {
                number: 1,
                cost: 3.50
            }
        },
        deceasedLastName: 'deceasedLastName',
        ccdCaseId: '1234567891011123',
        applicationversion: 1,
        applicationcode: 'FEE0026',
        ukcopiesversion: 0,
        ukcopiescode: 'FEE0003',
        overseascopiesversion: 3,
        overseascopiescode: 'FEE0003',
    };

    const postPaymentData ={
        amount: 300.00,
        description: 'Probate Fees',
        ccd_case_number: '1234567891011123',
        service: 'PROBATE',
        currency: 'GBP',
        site_id: 'P223',
        fees: [
            {
                calculated_amount: 12.5,
                ccd_case_number: '1234567891011123',
                code: 'FEE0026',
                memo_line: 'Probate Fees',
                reference: 'userId',
                version: 1,
                volume: 1
            },
            {
                calculated_amount: 1.5,
                ccd_case_number: '1234567891011123',
                code: 'FEE0003',
                memo_line: 'Additional UK copies',
                reference: 'userId',
                version: 0,
                volume: 1
            },
            {
                calculated_amount: 3.5,
                ccd_case_number: '1234567891011123',
                code: 'FEE0003',
                memo_line: 'Additional overseas copies',
                reference: 'userId',
                version: 3,
                volume: 1
            }
        ],
        language: ''
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

    describe('when a request to get an initiated payment', () => {
        describe('is required from a GET', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'A payment reference exists',
                    uponReceiving: ' a request for information for that payment reference ',
                    withRequest: {
                        method: 'GET',
                        path: '/card-payments/' + ctx.reference,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: paymentBodyExpectation
                    }
                })
            );

            it('successfully returns initiated payment', (done) => {
                const paymentClient = new PaymentClient('http://localhost:' + MOCK_SERVER_PORT + '/card-payments', ctx.sessionID);
                const verificationPromise = paymentClient.get(data);
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });

    describe('when a request to create a payment', () => {
        describe('is POSTED', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'A Payment is posted for a case',
                    uponReceiving: ' a request to create a payment for a case',
                    withRequest: {
                        method: 'POST',
                        path: '/card-payments',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization,
                            'return-url': 'http://localhost/payment-status',
                            'service-callback-url': 'http://localhost:8888/payment-updates'
                        },
                        body: postPaymentData
                    },
                    willRespondWith: {
                        status: 201,
                        headers: {'Content-Type': 'application/json'},
                        body: paymentPostedExpectation
                    }
                })
            );

            it('successfully returns created payment', (done) => {
                const paymentClient = new PaymentClient('http://localhost:' + MOCK_SERVER_PORT + '/card-payments', ctx.sessionID);
                const verificationPromise = paymentClient.post(createPaymentData, 'http://localhost', 'en');
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });

    describe('when a request to get an payments for a case', () => {
        describe('is required from a GET', () => {
            before(() =>
                provider.addInteraction({
                    // The 'state' field specifies a 'Provider State'
                    state: 'Payments exist for a case',
                    uponReceiving: 'a request for case payments ',
                    withRequest: {
                        method: 'GET',
                        path: '/payments',
                        query: 'service_name=Probate&ccd_case_number=1234567891011123',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': ctx.authToken,
                            'ServiceAuthorization': ctx.serviceAuthorization
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: {
                            payments: eachLike(paymentFeesBodyExpectation, {min: 1})
                        }
                    }
                })
            );

            it('successfully returns case payments', (done) => {
                const paymentClient = new PaymentClient('http://localhost:' + MOCK_SERVER_PORT + '/payments', ctx.sessionID);
                const verificationPromise = paymentClient.getCasePayments(data);
                assert.eventually.ok(verificationPromise).notify(done);
            });
        });
    });
    // Write pact files
    after(() => {
        return provider.finalize();
    });

});
