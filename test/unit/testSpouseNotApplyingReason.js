'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const SpouseNotApplyingReason = steps.SpouseNotApplyingReason;
const content = require('app/resources/en/translation/applicant/spousenotapplyingreason');

describe('SpouseNotApplyingReason', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = SpouseNotApplyingReason.constructor.getUrl();
            expect(url).to.equal('/spouse-not-applying-reason');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the context with the deceased name', (done) => {
            const req = {
                session: {
                    form: {
                        deceased: {
                            firstName: 'John',
                            lastName: 'Doe'
                        }
                    }
                }
            };

            const ctx = SpouseNotApplyingReason.getContextData(req);
            expect(ctx.deceasedName).to.equal('John Doe');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Renuncing is given', (done) => {
            const ctx = {spouseNotApplyingReason: content.optionRenuncing};
            const nextStepUrl = SpouseNotApplyingReason.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/any-other-children');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {spouseNotApplyingReason: content.optionOther};
            const nextStepUrl = SpouseNotApplyingReason.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/spouseNotApplying');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const ctx = {};
            const nextStepOptions = SpouseNotApplyingReason.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'spouseNotApplyingReason', value: content.optionRenuncing, choice: 'renuncing'},
                ]
            });
            done();
        });
    });
});
