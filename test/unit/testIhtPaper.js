'use strict';

const initSteps = require('app/core/initSteps');
const chai = require('chai');
const expect = chai.expect;
const assert = require('chai').assert;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const IhtPaper = steps.IhtPaper;

describe('IhtPaper', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtPaper.constructor.getUrl();
            expect(url).to.equal('/iht-paper');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the deceased married status and the screening_question feature toggle', (done) => {
            ctx = {
                form: 'IHT205',
                grossIHT205: '500000',
                netIHT205: '400000'
            };
            errors = {};
            [ctx, errors] = IhtPaper.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                form: 'IHT205',
                grossIHT205: '500000',
                grossValue: 500000,
                grossValuePaper: '500000',
                ihtFormId: 'IHT205',
                netIHT205: '400000',
                netValue: 400000,
                netValuePaper: '400000'
            });
            done();
        });
    });

    describe('action', () => {
        it('test isToggleEnabled is removed from the context', () => {
            const ctx = {
                grossValuePaper: 500000,
                netValuePaper: 400000
            };
            IhtPaper.action(ctx);
            assert.isUndefined(ctx.grossValuePaper);
            assert.isUndefined(ctx.netValuePaper);
        });
    });
});
