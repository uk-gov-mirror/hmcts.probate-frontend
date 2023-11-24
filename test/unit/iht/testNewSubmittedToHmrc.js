'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const sinon = require('sinon');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const NewSubmittedToHmrc = steps.NewSubmittedToHmrc;

describe('NewSubmittedToHmrc', () => {
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

    describe('handleGet()', () => {
        it('should return the context with the radio buttons set', (done) => {
            const ctxTotest= {};
            const formdata = {
                iht: {
                    estateValueCompleted: 'optionYes',
                    ihtFormEstateId: 'optionIHT400421'
                }
            };

            const [ctx] = NewSubmittedToHmrc.handleGet(ctxTotest, formdata);
            expect(ctx.ihtFormEstateId).to.deep.equal('optionIHT400421');
            done();
        });
    });
    describe('handlePost()', () => {
        let ctx;
        let formdata;
        let errors;

        it('should update ctx with estate values for optionIHT400421', () => {
            ctx = {
                ihtFormEstateId: 'optionIHT400421',
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
                ihtFormEstateId: 'optionIHT400421',
                estateValueCompleted: 'optionYes', // Expected change
            });

            // Assert other expectations (e.g., errors array, no string replacement)

            // You may not need done() for synchronous tests
        });

        it('should update ctx with estate values for optionNA', () => {
            ctx = {
                ihtFormEstateId: 'optionNA',
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
                ihtFormEstateId: 'optionNA',
                estateValueCompleted: 'optionNo', // Expected change
            });
            expect(formdata).to.deep.equal({
                iht: {
                    estateValueCompleted: 'optionNo',
                    ihtFormEstateId: 'optionNA',
                },
            });
        });
    });
    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = NewSubmittedToHmrc.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'ihtFormEstateId',
                    value: 'optionIHT400',
                    choice: 'optionIHT400'
                },
                {
                    key: 'ihtFormEstateId',
                    value: 'optionIHT400421',
                    choice: 'optionIHT400421'
                },
                {
                    key: 'ihtFormEstateId',
                    value: 'optionNA',
                    choice: 'optionNA'
                }]
            });
            done();
        });
    });
    describe('isComplete()', () => {
        it('should return the complete when have estateValueCompleted', (done) => {
            const ctx = {
                estateValueCompleted: 'optionYes'
            };
            const result = NewSubmittedToHmrc.isComplete(ctx);
            const expectedTrue = [true, 'inProgress'];
            expect(result).to.deep.equal(expectedTrue);
            done();
        });
        it('should return complete false when no estateValueCompleted', (done) => {
            const ctx = {
            };
            const result = NewSubmittedToHmrc.isComplete(ctx);
            const expectedFalse = [false, 'inProgress'];
            expect(result).to.deep.equal(expectedFalse);
            done();
        });
    });
});
