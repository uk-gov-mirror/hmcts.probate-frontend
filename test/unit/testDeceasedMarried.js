'use strict';

const initSteps = require('app/core/initSteps');
const chai = require('chai');
const expect = chai.expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const DeceasedMarried = steps.DeceasedMarried;

describe('DeceasedMarried', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DeceasedMarried.constructor.getUrl();
            expect(url).to.equal('/deceased-married');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the deceased married status and the screening_question feature toggle', (done) => {
            ctx = {
                married: 'Yes'
            };
            errors = {};
            [ctx, errors] = DeceasedMarried.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                married: 'Yes'
            });
            done();
        });
    });
});
