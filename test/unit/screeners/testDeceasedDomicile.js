'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const DeceasedDomicile = steps.DeceasedDomicile;
const content = require('app/resources/en/translation/screeners/deceaseddomicile');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/deceaseddomicile/schema');
const deceasedDomicile = rewire('app/steps/ui/screeners/deceaseddomicile/index');

describe('DeceasedDomicile', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DeceasedDomicile.constructor.getUrl();
            expect(url).to.equal('/deceased-domicile');
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
                domicile: content.optionYes
            };
            const nextStepUrl = DeceasedDomicile.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/iht-completed');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {
                domicile: content.optionNo
            };
            const nextStepUrl = DeceasedDomicile.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notInEnglandOrWales');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = DeceasedDomicile.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'domicile',
                    value: content.optionYes,
                    choice: 'inEnglandOrWales'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = DeceasedDomicile.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = deceasedDomicile.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/notInEnglandOrWales';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/deceaseddomicile';
            const i18next = {};
            const DecDom = new deceasedDomicile(steps, section, resourcePath, i18next, schema);

            DecDom.setEligibilityCookie(req, res, nextStepUrl);

            expect(deceasedDomicile.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(deceasedDomicile.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/notInEnglandOrWales'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
