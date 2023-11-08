'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const sinon = require('sinon');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const UniqueProbateCode = steps.UniqueProbateCode;

describe('UniqueProbateCode', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            // Create a spy for the getUrl() method
            const getUrlSpy = sinon.spy(UniqueProbateCode.constructor, 'getUrl');
            const url = UniqueProbateCode.constructor.getUrl();
            // Assert that the method was called
            expect(getUrlSpy.called).to.equal(true);
            expect(url).to.equal('/unique-probate-code');
            // Restore the spy
            getUrlSpy.restore();
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;
        it('should replace whitespace and return [ctx, errors]', () => {

            const uniqueProbateCodeInstance = UniqueProbateCode.constructor;
            function callHandlePost() {
                const ctx = {uniqueProbateCodeId: 'Test String With Spaces'};
                const errors = [];
                return uniqueProbateCodeInstance.handlePost(ctx, errors, {}, {language: 'en'});
            }
            const callHandlePostSpy = sinon.spy(callHandlePost);
            const [updatedCtx, updatedErrors] = callHandlePostSpy();
            sinon.assert.calledOnce(callHandlePostSpy);
            expect(updatedCtx.uniqueProbateCodeId).to.equal('TestStringWithSpaces');
            expect(updatedErrors).to.deep.equal([]);
            callHandlePostSpy.restore();
        });
        it('should replace whitespace and return [ctx, errors]', () => {
            // Create a spy for the method
            const uniqueProbateCodeInstance = UniqueProbateCode.constructor;

            // Create a spy for the handlePost method
            const postSpy = sinon.spy(uniqueProbateCodeInstance, 'handlePost');
            ctx = {uniqueProbateCodeId: 'Test String With Spaces'};
            errors = [];

            // Call the method that you want to test
            // This will execute the line that modifies ctx
            const [updatedCtx, updatedErrors] = UniqueProbateCode.handlePost(ctx, errors, {}, {language: 'en'});

            // Check if the method was called
            sinon.assert.calledOnce(postSpy);

            // Check if the ctx was modified as expected
            expect(updatedCtx.uniqueProbateCodeId).to.equal('TestStringWithSpaces');

            // Check if the errors were not modified
            expect(updatedErrors).to.deep.equal(errors);

            // Restore the spy
            postSpy.restore();
        });
        it('should return the ctx with the estate values', (done) => {
            ctx = {
                uniqueProbateCodeId: 'CTS040523 11043 tpps8e9'
            };
            errors = [];
            const replaceSpy = sinon.spy(String.prototype, 'replace');
            [ctx, errors] = UniqueProbateCode.handlePost(ctx, errors, {}, {language: 'en'});
            expect(ctx).to.deep.equal({
                uniqueProbateCodeId: 'CTS04052311043tpps8e9'
            });
            expect(errors.length).equal(0);
            sinon.assert.calledOnce(replaceSpy);
            replaceSpy.restore();
            done();
        });

    });

    describe('nextStepOptions()', () => {
        it('should remove spaces from uniqueProbateCodeId in ctx', () => {
            const ctx = {
                uniqueProbateCodeId: 'CTS040523 11043 tpps8e9'
            };
            const options = UniqueProbateCode.nextStepOptions(ctx);
            expect(options.uniqueProbateCodeId).to.equal('CTS04052311043tpps8e9');
        });
    });

});
