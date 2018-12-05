'use strict';

const initSteps = require('../../../app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const WillLeft = steps.WillLeft;
const content = require('app/resources/en/translation/screeners/willleft');
const rewire = require('rewire');
const sinon = require('sinon');
const schema = require('app/steps/ui/screeners/diedafteroctober2014/schema');
const diedAfter = rewire('app/steps/ui/screeners/diedafteroctober2014/index');

describe('WillLeft', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillLeft.constructor.getUrl();
            expect(url).to.equal('/will-left');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {left: content.optionYes};
            const nextStepUrl = WillLeft.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/will-original');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {left: content.optionNo};
            const nextStepUrl = WillLeft.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/noWill');
            done();
        });
    });

    describe('handlePost()', () => {
        let ctx;
        let errors;
        let formdata;
        let session;
        let hostname;
        let featureToggles;

        it('should return the ctx with the will left status and the intestacy_screening_question feature toggle', (done) => {
            ctx = {left: content.optionYes};
            errors = {};
            formdata = {};
            session = {};
            hostname = {};
            featureToggles = {};

            [ctx, errors] = WillLeft.handlePost(ctx, errors, formdata, session, hostname, featureToggles);
            expect(ctx).to.deep.equal({
                left: content.optionYes,
                isToggleEnabled: false
            });
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options when the FT is off', (done) => {
            const ctx = {
                isToggleEnabled: false
            };
            const nextStepOptions = WillLeft.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'left',
                    value: content.optionYes,
                    choice: 'withWill'
                }]
            });
            done();
        });

        it('should return the correct options when the FT is on', (done) => {
            const ctx = {
                isToggleEnabled: true
            };
            const nextStepOptions = WillLeft.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [
                    {
                        key: 'left',
                        value: content.optionYes,
                        choice: 'withWill'
                    },
                    {
                        key: 'left',
                        value: content.optionNo,
                        choice: 'withoutWillToggleOn'
                    }
                ]
            });
            done();
        });
    });

    describe('persistFormData()', () => {
        it('should return an empty object', () => {
            const result = WillLeft.persistFormData();
            expect(result).to.deep.equal({});
        });
    });

    describe('setEligibilityCookie()', () => {
        it('should call eligibilityCookie.setCookie() with the correct params', (done) => {
            const revert = diedAfter.__set__('eligibilityCookie', {setCookie: sinon.spy()});
            const req = {reqParam: 'req value'};
            const res = {resParam: 'res value'};
            const nextStepUrl = '/stop-page/diedAfter';
            const steps = {};
            const section = null;
            const resourcePath = 'screeners/diedafteroctober2014';
            const i18next = {};
            const DieAft = new diedAfter(steps, section, resourcePath, i18next, schema);

            DieAft.setEligibilityCookie(req, res, nextStepUrl);

            expect(diedAfter.__get__('eligibilityCookie.setCookie').calledOnce).to.equal(true);
            expect(diedAfter.__get__('eligibilityCookie.setCookie').calledWith(
                {reqParam: 'req value'},
                {resParam: 'res value'},
                '/stop-page/diedAfter'
            )).to.equal(true);

            revert();
            done();
        });
    });

    describe('action', () => {
        it('test isToggleEnabled is removed from the context', () => {
            const ctx = {
                isToggleEnabled: false
            };
            WillLeft.action(ctx);
            assert.isUndefined(ctx.isToggleEnabled);
        });
    });
});
