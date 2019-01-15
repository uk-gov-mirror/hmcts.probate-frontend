'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const ApplicantExecutor = steps.ApplicantExecutor;
const content = require('app/resources/en/translation/screeners/applicantexecutor');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/applicantexecutor/schema');
const applicantExecutor = rewire('app/steps/ui/screeners/applicantexecutor/index');

describe('ApplicantExecutor', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ApplicantExecutor.constructor.getUrl();
            expect(url).to.equal('/applicant-executor');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {
                executor: content.optionYes
            };
            const nextStepUrl = ApplicantExecutor.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/mental-capacity');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {
                executor: content.optionNo
            };
            const nextStepUrl = ApplicantExecutor.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/notExecutor');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = ApplicantExecutor.nextStepOptions();
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
            const result = ApplicantExecutor.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = applicantExecutor.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/notExecutor';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/applicantexecutor';
            const i18next = {};
            const AppExec = new applicantExecutor(steps, section, resourcePath, i18next, schema);

            AppExec.setEligibilityCookie(req, res, nextStepUrl);

            expect(applicantExecutor.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(applicantExecutor.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/notExecutor'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
