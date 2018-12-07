'use strict';

const EligibilityValidationStep = require('app/core/steps/EligibilityValidationStep');
const {expect} = require('chai');

// const rewire = require('rewire');
// const sinon = require('sinon');
const schema = require('app/steps/ui/deceased/newdeathcertificate/schema');
// const eligibilityCookie = rewire('app/utils/EligibilityCookie');

describe('EligibilityValidationStep.js', () => {
    const steps = {};
    const section = null;
    const resourcePath = 'deceased/newdeathcertificate';
    const i18next = {};

    // const pageUrl = '/new-death-certificate';
    // const nextStepUrl = '/new-deceased-domicile';
    // const fieldKey = 'deathCertificate';
    // const fieldValue = 'Yes';

    const eligibilityValidationStep = new EligibilityValidationStep(steps, section, resourcePath, i18next, schema);

    // describe('getContextData()', () => {
    //     it('should call eligibilityCookie.getAnswer() with the correct params', (done) => {
    //         const revert = eligibilityCookie.__set__('EligibilityCookie', {getAnswer: sinon.spy()});
    //         const req = {method: 'GET', session: {form: {}}};
    //         const res = {};
    //
    //         eligibilityValidationStep.getContextData(req, res, pageUrl, fieldKey);
    //
    //         expect(eligibilityCookie.__get__('EligibilityCookie.getAnswer').calledOnce).to.equal(true);
    //         // expect(eligibilityCookie.__get__('EligibilityCookie.getAnswer').calledWith(
    //         //     {method: 'GET', session: {form: {}}},
    //         //     '/new-death-certificate',
    //         //     'deathCertificate'
    //         // )).to.equal(true);
    //
    //         revert();
    //         done();
    //     });
    // });

    // describe('setEligibilityCookie()', () => {
    //     it('should return the same req, res, ctx params that are given', (done) => {
    //         const revert = eligibilityCookie.__set__('EligibilityCookie', {setCookie: sinon.spy()});
    //         const req = {};
    //         const res = {cookie: () => true};
    //
    //         eligibilityValidationStep.setEligibilityCookie(req, res, nextStepUrl, fieldKey, fieldValue);
    //
    //         expect(eligibilityCookie.__get__('EligibilityCookie.setCookie').calledOnce).to.equal(true);
    //         // expect(eligibilityCookie.__get__('EligibilityCookie.setCookie').calledWith(
    //         //     {reqParam: 'req value'},
    //         //     {resParam: 'res value'},
    //         //     '/stop-page/deathCertificate',
    //         //     'deathCertificate',
    //         //     'Yes'
    //         // )).to.equal(true);
    //
    //         revert();
    //         done();
    //     });
    // });

    describe('handlePost()', () => {
        it('should return the context and errors', () => {
            const ctx = {
                deathCertificate: 'Yes',
                domicile: 'Yes',
                completed: 'Yes'
            };
            const errors = {};
            const formdata = {};
            const session = {};

            const result = eligibilityValidationStep.handlePost(ctx, errors, formdata, session);
            expect(result).to.deep.equal([
                {
                    deathCertificate: 'Yes',
                    domicile: 'Yes',
                    completed: 'Yes'
                },
                {}
            ]);
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = eligibilityValidationStep.persistFormData();
            expect(result).to.deep.equal({});
        });
    });
});
