'use strict';

const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const content = require('app/resources/en/translation/executors/mentalcapacity');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/executors/mentalcapacity/schema');
const mentalCapacity = rewire('app/steps/ui/executors/mentalcapacity/index');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const MentalCapacity = steps.MentalCapacity;

describe('MentalCapacity', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = MentalCapacity.constructor.getUrl();
            expect(url).to.equal('/mental-capacity');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return url for the next step', (done) => {
            const ctx = {
                mentalCapacity: content.optionYes
            };
            const nextStepUrl = MentalCapacity.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/start-apply');
            done();
        });

        it('should return the url for the stop page', (done) => {
            const ctx = {
                mentalCapacity: content.optionNo
            };
            const nextStepUrl = MentalCapacity.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/mentalCapacity');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = MentalCapacity.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'mentalCapacity',
                    value: content.optionYes,
                    choice: 'isCapable'
                }]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = MentalCapacity.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = mentalCapacity.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/mentalCapacity';
            const steps = {};
            const section = null;
            const resourcePath = 'executors/mentalcapacity';
            const i18next = {};
            const MenCap = new mentalCapacity(steps, section, resourcePath, i18next, schema);

            MenCap.setEligibilityCookie(req, res, nextStepUrl);

            expect(mentalCapacity.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(mentalCapacity.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/mentalCapacity'
            )).to.equal(true);

            revert();
            done();
        });
    });
});
