'use strict';

const initSteps = require('../../../app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const OtherApplicants = steps.OtherApplicants;
const content = require('app/resources/en/translation/screeners/otherapplicants');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/otherapplicants/schema');
const othrAppl = rewire('app/steps/ui/screeners/otherapplicants/index');

describe('OtherApplicants', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = OtherApplicants.constructor.getUrl();
            expect(url).to.equal('/other-applicants');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {
                otherApplicants: content.optionYes
            };
            const nextStepUrl = OtherApplicants.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/otherApplicants');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {
                otherApplicants: content.optionNo
            };
            const nextStepUrl = OtherApplicants.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/start-apply');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = OtherApplicants.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'otherApplicants',
                    value: content.optionNo,
                    choice: 'noOthers'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = OtherApplicants.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = othrAppl.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/otherApplicants';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/otherapplicants';
            const i18next = {};
            const OthrAppl = new othrAppl(steps, section, resourcePath, i18next, schema);

            OthrAppl.setEligibilityCookie(req, res, nextStepUrl);

            expect(othrAppl.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(othrAppl.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/otherApplicants'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
