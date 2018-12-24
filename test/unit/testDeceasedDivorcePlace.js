'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const DivorcePlace = steps.DivorcePlace;
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const content = require('app/resources/en/translation/deceased/divorceplace');

describe('DivorcePlace', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DivorcePlace.constructor.getUrl();
            expect(url).to.equal('/deceased-divorce-place');
            done();
        });
    });

    describe('getContextData()', () => {
        let ctx;
        let req;

        it('should return the context with the legal process string in case of divorce', (done) => {
            req = {
                session: {
                    form: {
                        deceased: {
                            maritalStatus: contentMaritalStatus.optionDivorced
                        }
                    }
                }
            };

            ctx = DivorcePlace.getContextData(req);
            expect(ctx.legalProcess).to.equal(contentMaritalStatus.divorce);
            done();
        });

        it('should return the context with the legal process string in case of separation', (done) => {
            req = {
                session: {
                    form: {
                        deceased: {
                            maritalStatus: contentMaritalStatus.optionSeparated
                        }
                    }
                }
            };

            ctx = DivorcePlace.getContextData(req);
            expect(ctx.legalProcess).to.equal(contentMaritalStatus.separation);
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const ctx = {divorcePlace: content.optionYes};
            const nextStepUrl = DivorcePlace.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/tasklist');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const ctx = {divorcePlace: content.optionNo};
            const nextStepUrl = DivorcePlace.nextStepUrl(ctx);
            expect(nextStepUrl).to.equal('/stop-page/divorcePlace');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const ctx = {};
            const nextStepOptions = DivorcePlace.nextStepOptions(ctx);
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'divorcePlace',
                    value: content.optionYes,
                    choice: 'inEnglandOrWales'
                }]
            });
            done();
        });
    });
});
