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

        // Add more test cases for other conditions if needed
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
