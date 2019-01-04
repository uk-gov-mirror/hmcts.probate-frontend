'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('../../../app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const DiedAfterOctober2014 = steps.DiedAfterOctober2014;
const content = require('app/resources/en/translation/screeners/diedafteroctober2014');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/diedafteroctober2014/schema');
const diedAfter = rewire('app/steps/ui/screeners/diedafteroctober2014/index');

describe('DiedAfterOctober2014', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DiedAfterOctober2014.constructor.getUrl();
            expect(url).to.equal('/died-after-october-2014');
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
                diedAfter: content.optionYes
            };
            const nextStepUrl = DiedAfterOctober2014.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/relationship-to-deceased');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {
                diedAfter: content.optionNo
            };
            const nextStepUrl = DiedAfterOctober2014.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notDiedAfterOctober2014');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = DiedAfterOctober2014.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'diedAfter',
                    value: content.optionYes,
                    choice: 'diedAfter'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = DiedAfterOctober2014.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = diedAfter.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/diedAfter';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/diedafteroctober2014';
            const i18next = {};
            const DieAft = new diedAfter(steps, section, resourcePath, i18next, schema);

            DieAft.setEligibilityCookie(req, res, nextStepUrl);

            expect(diedAfter.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(diedAfter.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/diedAfter'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
