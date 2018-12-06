'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const rewire = require('rewire');
const content = require('app/resources/en/translation/applicant/newexecutor');
const sinon = require('sinon');
const schema = require('app/steps/ui/applicant/newexecutor/schema');
const newApplicantExecutor = rewire('app/steps/ui/applicant/newexecutor/index');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const NewApplicantExecutor = steps.NewApplicantExecutor;

describe('NewApplicantExecutor', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = NewApplicantExecutor.constructor.getUrl();
            expect(url).to.equal('/new-applicant-executor');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should call eligibilityCookie.getAnswer() with the correct params', (done) => {
            const revert = newApplicantExecutor.__set__('eligibilityCookie', {getAnswer: sinon.spy()});
            const req = {method: 'GET', session: {form: {}}};
            const res = {};

            const steps = {};
            const section = null;
            const resourcePath = 'applicant/newexecutor';
            const i18next = {};
            const newDeathCert = new newApplicantExecutor(steps, section, resourcePath, i18next, schema);

            newDeathCert.getContextData(req, res);

            expect(newApplicantExecutor.__get__('eligibilityCookie.getAnswer').calledOnce).to.equal(true);
            expect(newApplicantExecutor.__get__('eligibilityCookie.getAnswer').calledWith(
                {method: 'GET', session: {form: {}}},
                '/new-applicant-executor',
                'executor'
            )).to.equal(true);

            revert();
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {executor: content.optionYes};
            const nextStepUrl = NewApplicantExecutor.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/new-mental-capacity');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {executor: content.optionNo};
            const nextStepUrl = NewApplicantExecutor.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/notExecutor');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = NewApplicantExecutor.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'executor',
                    value: content.optionYes,
                    choice: 'isExecutor'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = NewApplicantExecutor.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = newApplicantExecutor.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/notExecutor';
            const fieldKey = 'executor';
            const fieldValue = 'Yes';
            const steps = {};
            const section = null;
            const resourcePath = 'applicant/newexecutor';
            const i18next = {};
            const newAppExec = new newApplicantExecutor(steps, section, resourcePath, i18next, schema);

            newAppExec.setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue);

            expect(newApplicantExecutor.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(newApplicantExecutor.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/notExecutor',
                'executor',
                'Yes'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
