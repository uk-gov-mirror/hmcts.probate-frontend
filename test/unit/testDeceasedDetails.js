'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const DeceasedDetails = steps.DeceasedDetails;

describe('DeceasedDetails', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DeceasedDetails.constructor.getUrl();
            expect(url).to.equal('/deceased-details');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the deceased name and the screening_question feature toggle', (done) => {
            ctx = {
                firstName: 'Dee',
                lastName: 'Ceased',
                dob_day: '02',
                dob_month: '03',
                dob_year: '1952',
                dod_day: '02',
                dod_month: '03',
                dod_year: '2000'
            };
            errors = {};
            [ctx, errors] = DeceasedDetails.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                firstName: 'Dee',
                lastName: 'Ceased',
                dob_day: '02',
                dob_month: '03',
                dob_year: '1952',
                dod_day: '02',
                dod_month: '03',
                dod_year: '2000'
            });
            done();
        });
    });
});
