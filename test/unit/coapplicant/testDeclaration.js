'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');

describe('Coapplicant-Declaration', () => {
    const Declaration = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]).CoApplicantDeclaration;

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Declaration.constructor.getUrl();
            expect(url).to.equal('/co-applicant-declaration');
            done();
        });
    });

    describe('shouldPersistFormData()', () => {
        it('should return false', () => {
            const persist = Declaration.shouldPersistFormData();
            expect(persist).to.equal(false);
        });
    });
});
