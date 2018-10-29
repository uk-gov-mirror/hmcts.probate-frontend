'use strict';
const UIStepRunner = require('app/core/runners/UIStepRunner');
const chai = require('chai');
const expect = chai.expect;

describe('UIStepRunner', () => {

    describe('isAliasDataMissing()', () => {
        let formdata;
        it('should return true when user declared and filled out alias or otherReason sections', (done) => {
            formdata = {
                declaration: {
                    declarationCheckbox: true
                },
                applicant: {
                    nameAsOnTheWill: 'No',
                    alias: 'Bob Builder',
                    aliasReason: 'Divorce'
                },
                executors: {
                    alias: 'Yes',
                    hasOtherName: true,
                    currentNameReason: 'Marriage'
                }
            };
            const result = UIStepRunner.isAliasDataMissing(formdata);
            expect(result).to.equal(true);
            done();
        });

        it('should return false when declared but neither alias or otherReason sections completed', (done) => {
            formdata = {
                declaration: {
                    declarationCheckbox: true
                },
                applicant: {
                    nameAsOnTheWill: 'No',
                },
                executors: {
                    alias: 'Yes',
                    list: [
                        {hasOtherName: true}
                    ]
                }
            };
            const result = UIStepRunner.isAliasDataMissing(formdata);
            expect(result).to.equal(false);
            done();
        });

        it('should return false when not declared', (done) => {
            formdata = {
                declaration: {
                    declarationCheckbox: false
                },
                applicant: {
                    nameAsOnTheWill: 'No',
                    alias: 'Bob Builder',
                    aliasReason: 'Divorce'
                },
                executors: {
                    alias: 'Yes',
                    hasOtherName: true,
                    currentNameReason: 'Marriage'
                }
            };
            const result = UIStepRunner.isAliasDataMissing(formdata);
            expect(result).to.equal(false);
            done();
        });
    });
});
