'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');

describe('Pin-Sent', () => {
    const PinSent = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]).PinSent;

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = PinSent.constructor.getUrl();
            expect(url).to.equal('/pin-sent');
            done();
        });
    });

    describe('shouldPersistFormData()', () => {
        it('should return false', () => {
            const persist = PinSent.shouldPersistFormData();
            expect(persist).to.equal(false);
        });
    });
});
