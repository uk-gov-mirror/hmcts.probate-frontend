'use strict';
const initSteps = require('app/core/initSteps');
const chai = require('chai');
const expect = chai.expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);

describe('ApplicantAliasReason', () => {
    const ApplicantAliasReason = steps.ApplicantAliasReason;

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantAliasReason.constructor.getUrl();
            expect(url).to.equal('/applicant-alias-reason');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;
        it('should delete otherReason when the aliasReason is not set to other', (done) => {
            ctx = {
                aliasReason: 'Divorce',
                otherReason: 'because I wanted to'
            };
            errors = {};
            [ctx, errors] = ApplicantAliasReason.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({aliasReason: 'Divorce'});
            done();
        });

        it('should not remove otherReason from the ctx when the aliasReason is set to other', (done) => {
            ctx = {
                aliasReason: 'other',
                otherReason: 'because I wanted to'
            };
            errors = {};
            [ctx, errors] = ApplicantAliasReason.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                aliasReason: 'other',
                otherReason: 'because I wanted to'
            });
        });

        describe('isComplete()', () => {
        it('should return the correct data when the feature toggle does not exist', (done) => {
            const ApplicantAliasReason = steps.ApplicantAliasReason;
            const ctx = {};
            const formdata = {};
            const featureToggles = {};
            const isComplete = ApplicantAliasReason.isComplete(ctx, formdata, featureToggles);
            expect(isComplete).to.deep.equal([true, 'noProgress']);
            done();
        });
    });
});
