'use strict';

const initSteps = require('../../../app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const RelationshipToDeceased = steps.RelationshipToDeceased;
const content = require('app/resources/en/translation/screeners/relationshiptodeceased');

describe('RelationshipToDeceased', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = RelationshipToDeceased.constructor.getUrl();
            expect(url).to.equal('/relationship-to-deceased');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {related: content.optionYes};
            const nextStepUrl = RelationshipToDeceased.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/other-applicants');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {related: content.optionNo};
            const nextStepUrl = RelationshipToDeceased.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/notRelated');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = RelationshipToDeceased.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'related',
                    value: content.optionYes,
                    choice: 'related'
                }]
            });
            done();
        });
    });
});
