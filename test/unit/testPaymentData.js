const paymentData = require('app/components/payment-data');
const assert = require('chai').assert;
const config = require('app/config');

describe('PaymentData', () => {
    describe('createPaymentData', () => {
        it('Returns a payment data object containing the amount converted to pence', () => {
            const data = {
                amount: '10',
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const result = paymentData.createPaymentData(data);
            assert.equal(result.amount, '10');
        });

        it('Returns a payment data object, with fee, no extra copies', () => {
            const data = {
                applicationFee: config.payment.applicationFee,
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE001';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.equal(result.case_reference, expectedReference);

        });

        it('Returns a payment data object, with fee and uk copies, no overseas copies', () => {
            const data = {
                applicationFee: config.payment.applicationFee,
                copies: {
                    uk: {
                        number: 1
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE001$FEE002/1';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.equal(result.case_reference, expectedReference);

        });

       it('Returns a payment data object, with fee, no uk copies, with overseas copies', () => {
            const data = {
                applicationFee: config.payment.applicationFee,
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 2
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE001$FEE003/2';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.equal(result.case_reference, expectedReference);
        });

         it('Returns a payment data object, with fee, with uk copies, with overseas copies', () => {
            const data = {
                applicationFee: config.payment.applicationFee,
                copies: {
                    uk: {
                        number: 3
                    },
                    overseas: {
                        number: 4
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE001$FEE002/3$FEE003/4';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.equal(result.case_reference, expectedReference);
        });

        it('Returns a payment data object, no fee, with extra uk copies, no overseas copies', () => {
            const data = {
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 5
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE002/5';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.deepEqual(result.case_reference, expectedReference);
        });

         it('Returns a payment data object, no fee, no uk copies, with overseas copies', () => {
            const data = {
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 6
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE003/6';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.deepEqual(result.case_reference, expectedReference);
        });

         it('Returns a payment data object, no fee, with uk copies, with overseas copies', () => {
            const data = {
                applicationFee: 0,
                copies: {
                    uk: {
                        number: 7
                    },
                    overseas: {
                        number: 8
                    }
                }
            };
            const expectedReference = 'PROBATE$$$123456$$$P223$$$FEE002/7$FEE003/8';
            const result = paymentData.createPaymentData(data, () => '123456');
            assert.deepEqual(result.case_reference, expectedReference);
        });

        it('Returns a payment data object containing a description', () => {
            const data = {
                copies: {
                    uk: {
                        number: 0
                    },
                    overseas: {
                        number: 0
                    }
                }
            };
            const result = paymentData.createPaymentData(data);
            assert.exists(result.description);
        });

        it('Limits case reference to 32 characters', () => {
            const result = paymentData.createCaseReference('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz');
            assert.isTrue(result.length === 32);
        });
    });

    describe('createPaymentFees', () => {
        it('should return the correct data', () => {
            const params = {
                amount: 1.50,
                ccdCaseId: 'CASEREF123',
                code: 'CODE123',
                memoLine: 'Additional overseas copies',
                reference: 123,
                version: 3,
                volume: 3
            };
            const paymentFees = paymentData.createPaymentFees(params);
            assert.deepEqual(paymentFees, {
                calculated_amount: params.amount,
                ccd_case_number: params.ccdCaseId,
                code: params.code,
                memo_line: params.memoLine,
                reference: params.reference,
                version: params.version,
                volume: params.volume
            });
        });
    });
});
