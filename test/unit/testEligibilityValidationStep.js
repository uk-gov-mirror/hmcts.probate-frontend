// 'use strict';

// const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
// const {expect} = require('chai');

// describe('EligibilityValidationStep.js', () => {
    // describe('setEligibilityCookie()', () => {
    //     it('should return the same req, res, ctx params that are given', (done) => {
    //         const steps = {};
    //         const section = null;
    //         const resourcePath = 'will/left';
    //         const i18next = {};
    //         const testReq = {reqParam: 'req value'};
    //         const testRes = {resParam: 'res value'};
    //         const testCtx = {ctxParam: 'ctx value'};
    //         const step = new Step(steps, section, resourcePath, i18next);
    //         const [req, res, ctx] = step.setEligibilityCookie(testReq, testRes, testCtx);
    //         expect(req).to.deep.equal({reqParam: 'req value'});
    //         expect(res).to.deep.equal({resParam: 'res value'});
    //         expect(ctx).to.deep.equal({ctxParam: 'ctx value'});
    //         done();
    //     });
    // });

    // describe('getContextData()', () => {
    //     it('should call eligibilityCookie.getAnswer() with the correct params', (done) => {
    //         const revert = newDeathCertificate.__set__('eligibilityCookie', {getAnswer: sinon.spy()});
    //         const req = {method: 'GET', session: {form: {}}};
    //         const res = {};
    //
    //         const steps = {};
    //         const section = null;
    //         const resourcePath = 'deceased/newdeathcertificate';
    //         const i18next = {};
    //         const newDeathCert = new newDeathCertificate(steps, section, resourcePath, i18next, schema);
    //
    //         newDeathCert.getContextData(req, res);
    //
    //         expect(newDeathCertificate.__get__('eligibilityCookie.getAnswer').calledOnce).to.equal(true);
    //         expect(newDeathCertificate.__get__('eligibilityCookie.getAnswer').calledWith(
    //             {method: 'GET', session: {form: {}}},
    //             '/new-death-certificate',
    //             'deathCertificate'
    //         )).to.equal(true);
    //
    //         revert();
    //         done();
    //     });
    // });

    // describe('persistFormData()', () => {
    //     it('should return an empty object', () => {
    //         const result = NewDeathCertificate.persistFormData();
    //         expect(result).to.deep.equal({});
    //     });
    // });

    // describe('setEligibilityCookie()', () => {
    //     it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
    //         const revert = newDeathCertificate.__set__('eligibilityCookie', {setCookie: sinon.spy()});
    //         const req = {reqParam: 'req value'};
    //         const res = {resParam: 'res value'};
    //         const nextStepUrl = '/stop-page/deathCertificate';
    //         const fieldKey = 'deathCertificate';
    //         const fieldValue = 'Yes';
    //         const steps = {};
    //         const section = null;
    //         const resourcePath = 'deceased/newdeathcertificate';
    //         const i18next = {};
    //         const newDeathCert = new newDeathCertificate(steps, section, resourcePath, i18next, schema);
    //
    //         newDeathCert.setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue);
    //
    //         expect(newDeathCertificate.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
    //         expect(newDeathCertificate.__get__('eligibilityCookie.setCookie').calledWith(
    //             {reqParam: 'req value'},
    //             {resParam: 'res value'},
    //             '/stop-page/deathCertificate',
    //             'deathCertificate',
    //             'Yes'
    //         )).to.equal(true);
    //
    //         revert();
    //         done();
    //     });
    // });
// });
