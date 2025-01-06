'use strict';
const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const ExecutorsNamed = steps.ExecutorsNamed;

describe('ExecutorsNamed', () => {

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ExecutorsNamed.constructor.getUrl();
            expect(url).to.equal('/executors-named');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const ctx = {};
            const nextStepOptions = ExecutorsNamed.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {key: 'multiExec', value: true, choice: 'multiExec'},
                    {key: 'multiExecOptionNo', value: true, choice: 'multiExecOptionNo'},
                    {key: 'singleExec', value: true, choice: 'otherwise'}
                ]
            });
            done();
        });
    });

    describe('createExecutorList()', () => {
        it('should create a list with the main applicant as the first executor', () => {
            const ctx = {};
            const formdata = {
                applicant: {
                    'firstName': 'Dave',
                    'lastName': 'Bassett',
                    'nameAsOnTheWill': 'optionYes',
                    'alias': 'David James',
                    'aliasReason': 'Divorce',
                    'otherReason': ''
                },
                executors: []
            };
            ExecutorsNamed.createExecutorList(ctx, formdata);
            assert.lengthOf(ctx.list, 1);
            expect(ctx.list[0]).to.deep.equal({
                firstName: 'Dave',
                lastName: 'Bassett',
                nameAsOnTheWill: 'optionYes',
                alias: 'David James',
                aliasReason: 'Divorce',
                otherReason: '',
                isApplying: true,
                isApplicant: true,
                fullName: 'Dave Bassett'
            });
        });

        it('should handle an empty executors list', () => {
            const ctx = {};
            const formdata = {
                applicant: {
                    'firstName': 'Dave',
                    'lastName': 'Bassett',
                    'nameAsOnTheWill': 'optionYes',
                    'alias': 'David James',
                    'aliasReason': 'Divorce',
                    'otherReason': ''
                },
                executors: []
            };
            ExecutorsNamed.createExecutorList(ctx, formdata);
            assert.lengthOf(ctx.list, 1);
        });

        it('should handle multiple executors', () => {
            const ctx = {};
            const formdata = {
                applicant: {
                    'firstName': 'Dave',
                    'lastName': 'Bassett',
                    'nameAsOnTheWill': 'optionYes',
                    'alias': 'David James',
                    'aliasReason': 'Divorce',
                    'otherReason': ''
                },
                executors: {
                    list: [
                        {
                            'firstName': 'Dave',
                            'lastName': 'Bassett',
                            'isApplying': 'optionYes',
                            'isApplicant': true
                        }, {
                            fullName: 'Ed Brown'
                        }, {
                            fullName: 'Dave Miller'
                        }
                    ]
                }
            };
            ExecutorsNamed.createExecutorList(ctx, formdata);
            assert.lengthOf(ctx.list, 3);
            expect(ctx.list[1]).to.deep.equal({
                fullName: 'Ed Brown'
            });
            expect(ctx.list[2]).to.deep.equal({
                fullName: 'Dave Miller'
            });
        });
    });
    describe('isComplete', () => {
        it('should return inProgresswhen executorsNamed is Yes', () => {
            const ctx = {executorsNamed: 'optionYes'};
            const result = ExecutorsNamed.isComplete(ctx);
            expect(result).to.deep.equal([true, 'inProgress']);
        });

        it('should return inProgress when executorsNamed is No', () => {
            const ctx = {executorsNamed: 'optionNo'};
            const result = ExecutorsNamed.isComplete(ctx);
            expect(result).to.deep.equal([true, 'inProgress']);
        });

        it('should not return inProgress when executorsNamed is undefined', () => {
            const ctx = {};
            const result = ExecutorsNamed.isComplete(ctx);
            expect(result).to.deep.equal([false, 'inProgress']);
        });
    });
});
