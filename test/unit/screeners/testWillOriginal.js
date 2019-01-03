'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const WillOriginal = steps.WillOriginal;
const content = require('app/resources/en/translation/screeners/willoriginal');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/willoriginal/schema');
const willOriginal = rewire('app/steps/ui/screeners/willoriginal/index');

describe('WillOriginal', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillOriginal.constructor.getUrl();
            expect(url).to.equal('/will-original');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        const req = {
            session: {
                journey: journey
            }
        };

        it('should return the correct url when Yes is given', (done) => {
            const ctx = {
                original: content.optionYes
            };
            const nextStepUrl = WillOriginal.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/applicant-executor');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {
                original: content.optionNo
            };
            const nextStepUrl = WillOriginal.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notOriginal');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = WillOriginal.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'original',
                    value: content.optionYes,
                    choice: 'isOriginal'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = WillOriginal.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = willOriginal.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/notOriginal';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/willoriginal';
            const i18next = {};
            const WilOri = new willOriginal(steps, section, resourcePath, i18next, schema);

            WilOri.setEligibilityCookie(req, res, nextStepUrl);

            expect(willOriginal.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(willOriginal.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/notOriginal'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
