'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const DeathCertificate = steps.DeathCertificate;
const content = require('app/resources/en/translation/screeners/deathcertificate');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/deathcertificate/schema');
const deathCertificate = rewire('app/steps/ui/screeners/deathcertificate/index');

describe('DeathCertificate', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DeathCertificate.constructor.getUrl();
            expect(url).to.equal('/death-certificate');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                deathCertificate: content.optionYes
            };
            const nextStepUrl = DeathCertificate.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/deceased-domicile');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                deathCertificate: content.optionNo
            };
            const nextStepUrl = DeathCertificate.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/deathCertificate');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = DeathCertificate.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'deathCertificate',
                    value: content.optionYes,
                    choice: 'hasCertificate'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = DeathCertificate.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = deathCertificate.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/deathCertificate';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/deathcertificate';
            const i18next = {};
            const deathCert = new deathCertificate(steps, section, resourcePath, i18next, schema);

            deathCert.setEligibilityCookie(req, res, nextStepUrl);

            expect(deathCertificate.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(deathCertificate.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/deathCertificate'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
