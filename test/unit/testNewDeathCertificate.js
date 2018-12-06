'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const content = require('app/resources/en/translation/deceased/newdeathcertificate');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/deceased/newdeathcertificate/schema');
const newDeathCertificate = rewire('app/steps/ui/deceased/newdeathcertificate/index');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const NewDeathCertificate = steps.NewDeathCertificate;

describe('NewDeathCertificate', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = NewDeathCertificate.constructor.getUrl();
            expect(url).to.equal('/new-death-certificate');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should call eligibilityCookie.getAnswer() with the correct params', (done) => {
            const revert = newDeathCertificate.__set__('eligibilityCookie', {getAnswer: sinon.spy()});
            const req = {method: 'GET', session: {form: {}}};
            const res = {};

            const steps = {};
            const section = null;
            const resourcePath = 'deceased/newdeathcertificate';
            const i18next = {};
            const newDeathCert = new newDeathCertificate(steps, section, resourcePath, i18next, schema);

            newDeathCert.getContextData(req, res);

            expect(newDeathCertificate.__get__('eligibilityCookie.getAnswer').calledOnce).to.equal(true);
            expect(newDeathCertificate.__get__('eligibilityCookie.getAnswer').calledWith(
                {method: 'GET', session: {form: {}}},
                '/new-death-certificate',
                'deathCertificate'
            )).to.equal(true);

            revert();
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {deathCertificate: content.optionYes};
            const nextStepUrl = NewDeathCertificate.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/new-deceased-domicile');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {deathCertificate: content.optionNo};
            const nextStepUrl = NewDeathCertificate.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/deathCertificate');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = NewDeathCertificate.nextStepOptions();
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
            const result = NewDeathCertificate.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = newDeathCertificate.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/deathCertificate';
            const fieldKey = 'deathCertificate';
            const fieldValue = 'Yes';
            const steps = {};
            const section = null;
            const resourcePath = 'deceased/newdeathcertificate';
            const i18next = {};
            const newDeathCert = new newDeathCertificate(steps, section, resourcePath, i18next, schema);

            newDeathCert.setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue);

            expect(newDeathCertificate.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(newDeathCertificate.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/deathCertificate',
                'deathCertificate',
                'Yes'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
