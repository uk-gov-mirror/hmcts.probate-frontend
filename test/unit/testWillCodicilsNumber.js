'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const CodicilsNumber = steps.CodicilsNumber;

describe('CodicilsNumber', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = CodicilsNumber.constructor.getUrl();
            expect(url).to.equal('/codicils-number');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the deceased married status and the screening_question feature toggle', (done) => {
            ctx = {
                codicilsNumber: '3'
            };
            errors = {};
            [ctx, errors] = CodicilsNumber.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                codicilsNumber: '3'
            });
            done();
        });
    });
});
