'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const sinon = require('sinon');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const SubmittedToHmrc = steps.SubmittedToHmrc;

describe('SubmittedToHmrc', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            // Create a spy for the getUrl() method
            const getUrlSpy = sinon.spy(SubmittedToHmrc.constructor, 'getUrl');
            const url = SubmittedToHmrc.constructor.getUrl();
            // Assert that the method was called
            expect(getUrlSpy.called).to.equal(true);
            expect(url).to.equal('/submitted-to-hmrc');
            // Restore the spy
            getUrlSpy.restore();
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = SubmittedToHmrc.nextStepOptions();
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
                }]
            });
            done();
        });
    });
});
