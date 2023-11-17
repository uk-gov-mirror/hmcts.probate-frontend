'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const sinon = require('sinon');
const {assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const NewSubmittedToHmrc = steps.NewSubmittedToHmrc;

describe.only('NewSubmittedToHmrc', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            // Create a spy for the getUrl() method
            const getUrlSpy = sinon.spy(NewSubmittedToHmrc.constructor, 'getUrl');
            const url = NewSubmittedToHmrc.constructor.getUrl();
            // Assert that the method was called
            expect(getUrlSpy.called).to.equal(true);
            expect(url).to.equal('/new-submitted-to-hmrc');
            // Restore the spy
            getUrlSpy.restore();
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the context with the radio buttons set', (done) => {
            const req = {
                session: {
                    form: {
                        iht: {
                            estateValueCompleted: 'optionYes',
                            ihtFormEstateId: 'optionIHT400421'
                        }
                    }
                }
            };

            const ctx = NewSubmittedToHmrc.getContextData(req);
            expect(ctx.ihtFormIdTesting).to.equal('optionIHT400421');
            done();
        });
        it('should return the context with the radio buttons set', (done) => {
            const req = {
                session: {
                    form: {
                        iht: {
                            estateValueCompleted: 'optionNo',
                            ihtFormEstateId: 'optionNA'
                        }
                    }
                }
            };

            const ctx = NewSubmittedToHmrc.getContextData(req);
            expect(ctx.ihtFormIdTesting).to.equal('optionNA');
            done();
        });
    });
    describe('handlePost()', () => {
        let ctx;
        let formdata;
        let errors;

        it('should update ctx with estate values for optionIHT400421', () => {
            ctx = {
                ihtFormIdTesting: 'optionIHT400421',
                ihtFormEstateId: 'initialValue',
                estateValueCompleted: 'initialOption',
            };
            formdata = {
                iht: {
                    ihtFormEstateId: 'initialValue',
                    estateValueCompleted: 'initialOption',
                },
            };
            errors = [];

            NewSubmittedToHmrc.handlePost(ctx, errors, formdata, {language: 'en'});

            // Assert the expected changes in ctx
            expect(ctx).to.deep.equal({
                ihtFormIdTesting: 'optionIHT400421',
                ihtFormEstateId: 'optionIHT400421',
                estateValueCompleted: 'optionYes', // Expected change
            });

            // Assert other expectations (e.g., errors array, no string replacement)

            // You may not need done() for synchronous tests
        });

        it('should update ctx with estate values for optionNA', () => {
            ctx = {
                ihtFormIdTesting: 'optionNA',
                ihtFormEstateId: 'initialValue',
                estateValueCompleted: 'initialOption',
            };
            formdata = {
                iht: {
                    ihtFormEstateId: 'initialValue',
                    estateValueCompleted: 'initialOption',
                },
            };
            errors = [];

            NewSubmittedToHmrc.handlePost(ctx, errors, formdata, {language: 'en'});

            // Assert the expected changes in ctx
            expect(ctx).to.deep.equal({
                ihtFormIdTesting: 'optionNA',
                estateValueCompleted: 'optionNo', // Expected change
            });

            // Assert other expectations (e.g., errors array, no string replacement)

            // You may not need done() for synchronous tests
        });

        // Add more test cases for other conditions if needed
    });

    describe('action()', () => {
        it('test it cleans grossValue + netValue + estateNetQualifyingValue if ' +
            'estateValueCompleted is Yes', () => {
            const ctx = {
                estateGrossValue: '100',
                estateNetValue: '90',
                estateNetQualifyingValue: '90',
                estateValueCompleted: 'optionYes',
            };
            const formdata = {
                iht: {
                    estateGrossValue: '100',
                    estateNetValue: '90',
                    estateNetQualifyingValue: '90',
                },
            };

            NewSubmittedToHmrc.action(ctx, formdata);

            assert.isUndefined(formdata.iht.estateGrossValue);
            assert.isUndefined(formdata.iht.estateNetValue);
            assert.isUndefined(formdata.iht.estateNetQualifyingValue);
        });
        it('test it cleans estateGrossValue + estateNetValue  if estateValueCompleted is Yes', () => {
            const ctx = {
                grossValue: '100',
                netValue: '90',
                estateValueCompleted: 'optionNo',
            };
            const formdata = {
                iht: {
                    grossValue: '100',
                    netValue: '90',
                    estateNetQualifyingValue: '90',
                },
            };

            NewSubmittedToHmrc.action(ctx, formdata);

            assert.isUndefined(formdata.iht.grossValue);
            assert.isUndefined(formdata.iht.netValue);
        });
    });
    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = NewSubmittedToHmrc.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'ihtFormIdTesting',
                    value: 'optionIHT400',
                    choice: 'optionIHT400'
                },
                {
                    key: 'ihtFormIdTesting',
                    value: 'optionIHT400421',
                    choice: 'optionIHT400421'
                },
                {
                    key: 'ihtFormIdTesting',
                    value: 'NOTAPPLICABLE',
                    choice: 'optionNA'
                }]
            });
            done();
        });
    });
});
