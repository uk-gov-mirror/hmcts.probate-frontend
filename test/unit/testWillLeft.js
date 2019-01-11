'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const content = require('app/resources/en/translation/will/left');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/will/left/schema');
const willLeft = rewire('app/steps/ui/will/left/index');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const WillLeft = steps.WillLeft;

describe('WillLeft', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillLeft.constructor.getUrl();
            expect(url).to.equal('/will-left');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return url for the next step', (done) => {
            const ctx = {
                left: content.optionYes
            };
            const nextStepUrl = WillLeft.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/will-original');
            done();
        });

        it('should return the url for the stop page', (done) => {
            const ctx = {
                left: content.optionNo
            };
            const nextStepUrl = WillLeft.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/noWill');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = WillLeft.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'left',
                    value: content.optionYes,
                    choice: 'withWill'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = WillLeft.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = willLeft.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/noWill';
            const steps = {};
            const section = null;
            const resourcePath = 'will/left';
            const i18next = {};
            const WilLef = new willLeft(steps, section, resourcePath, i18next, schema);

            WilLef.setEligibilityCookie(req, res, nextStepUrl);

            expect(willLeft.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(willLeft.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/noWill'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
