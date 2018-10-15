'use strict';

const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const WillCodicils = steps.WillCodicils;
const json = require('app/resources/en/translation/will/codicils');

describe('WillCodicils', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillCodicils.constructor.getUrl();
            expect(url).to.equal('/will-codicils');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;

        it('should return the ctx with the deceased married status', (done) => {
            ctx = {
                codicils: 'Yes'
            };
            errors = {};
            [ctx, errors] = WillCodicils.handlePost(ctx, errors);
            expect(ctx).to.deep.equal({
                codicils: 'Yes'
            });
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const ctx = {};
            const nextStepOptions = WillCodicils.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'codicils',
                    value: json.optionNo,
                    choice: 'noCodicils'
                }]
            });
            done();
        });
    });

    describe('action', () => {
        it('cleans up context', () => {
            const ctx = {
                codicils: json.optionNo,
                codicilsNumber: 3
            };
            WillCodicils.action(ctx);
            assert.isUndefined(ctx.codicilsNumber);
        });
    });
});
