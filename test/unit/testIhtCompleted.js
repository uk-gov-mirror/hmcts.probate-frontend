'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const content = require('app/resources/en/translation/iht/completed');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/iht/completed/schema');
const ihtCompleted = rewire('app/steps/ui/iht/completed/index');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const IhtCompleted = steps.IhtCompleted;

describe('IhtCompleted', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtCompleted.constructor.getUrl();
            expect(url).to.equal('/iht-completed');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {completed: content.optionYes};
            const nextStepUrl = IhtCompleted.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/will-left');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {completed: content.optionNo};
            const nextStepUrl = IhtCompleted.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/ihtNotCompleted');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = IhtCompleted.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'completed',
                    value: content.optionYes,
                    choice: 'completed'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = IhtCompleted.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = ihtCompleted.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/ihtNotCompleted';
            const steps = {};
            const section = null;
            const resourcePath = 'iht/completed';
            const i18next = {};
            const IhtCom = new ihtCompleted(steps, section, resourcePath, i18next, schema);

            IhtCom.setEligibilityCookie(req, res, nextStepUrl);

            expect(ihtCompleted.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(ihtCompleted.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/ihtNotCompleted'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
