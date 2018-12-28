'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const AllChildrenOver18 = steps.AllChildrenOver18;
const content = require('app/resources/en/translation/deceased/allchildrenover18');

describe('AllChildrenOver18', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = AllChildrenOver18.constructor.getUrl();
            expect(url).to.equal('/all-children-over-18');
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

            const ctx = AllChildrenOver18.getContextData(req);
            expect(ctx.deceasedName).to.equal('John Doe');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when all children are over 18', (done) => {
            const ctx = {allChildrenOver18: content.optionYes};
            const nextStepUrl = AllChildrenOver18.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/any-deceased-children');
            done();
        });

        it('should return the correct url when some children are under 18', (done) => {
            const ctx = {allChildrenOver18: content.optionNo};
            const nextStepUrl = AllChildrenOver18.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/childrenUnder18');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const ctx = {};
            const nextStepOptions = AllChildrenOver18.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'allChildrenOver18', value: content.optionYes, choice: 'allChildrenOver18'},
                ]
            });
            done();
        });
    });
});
