'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const IhtEstateForm = steps.IhtEstateForm;

describe('EstateForm', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtEstateForm.constructor.getUrl();
            expect(url).to.equal('/estate-form');
            done();
        });
    });
    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = IhtEstateForm.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'optionIHT400',
                    value: 'optionIHT400',
                    choice: 'optionIHT400'
                }, {
                    key: 'optionIHT400421',
                    value: 'optionIHT400421',
                    choice: 'optionIHT400421'
                },
                {
                    key: 'optionIHT205',
                    value: 'optionIHT205',
                    choice: 'optionIHT205'

                }]
            });
            done();
        });
    });

});
