'use strict';

const initSteps = require('app/core/initSteps');
const chai = require('chai');
const expect = chai.expect;
const assert = require('chai').assert;
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

        it('should return the ctx with the deceased married status and the screening_question feature toggle', (done) => {
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
        it('should return the correct options when the FT is off', (done) => {
            const ctx = {
                isToggleEnabled: false
            };
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

        it('should return the correct options when the FT is on', (done) => {
            const ctx = {
                isToggleEnabled: true
            };
            const nextStepOptions = WillCodicils.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'codicils',
                    value: json.optionNo,
                    choice: 'noCodicilsToggleOn'
                }]
            });
            done();
        });
    });

    describe('action', () => {
        it('test isToggleEnabled is removed from the context', () => {
            const ctx = {
                codicils: json.optionNo,
                codicilsNumber: 3
            };
            WillCodicils.action(ctx);
            assert.isUndefined(ctx.codicilsNumber);
        });
    });
});
