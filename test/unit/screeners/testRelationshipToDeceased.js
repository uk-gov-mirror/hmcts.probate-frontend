'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('../../../app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const RelationshipToDeceased = steps.RelationshipToDeceased;
const content = require('app/resources/en/translation/screeners/relationshiptodeceased');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/relationshiptodeceased/schema');
const relatDec = rewire('app/steps/ui/screeners/relationshiptodeceased/index');

describe('RelationshipToDeceased', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = RelationshipToDeceased.constructor.getUrl();
            expect(url).to.equal('/relationship-to-deceased');
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
                related: content.optionYes
            };
            const nextStepUrl = RelationshipToDeceased.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/other-applicants');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                related: content.optionNo
            };
            const nextStepUrl = RelationshipToDeceased.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notRelated');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = RelationshipToDeceased.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'related',
                    value: content.optionYes,
                    choice: 'related'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = RelationshipToDeceased.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = relatDec.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/notRelated';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/relationshiptodeceased';
            const i18next = {};
            const RelatDec = new relatDec(steps, section, resourcePath, i18next, schema);

            RelatDec.setEligibilityCookie(req, res, nextStepUrl);

            expect(relatDec.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(relatDec.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/notRelated'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
