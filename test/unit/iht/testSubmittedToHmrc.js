'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const sinon = require('sinon');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const SubmittedToHmrc = steps.SubmittedToHmrc;
const probateJourney = require('app/journeys/probate');

describe('SubmittedToHmrc', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            // Create a spy for the getUrl() method
            const getUrlSpy = sinon.spy(SubmittedToHmrc.constructor, 'getUrl');
            const url = SubmittedToHmrc.constructor.getUrl();
            // Assert that the method was called
            expect(getUrlSpy.called).to.equal(true);
            expect(url).to.equal('/submitted-to-hmrc');
            // Restore the spy
            getUrlSpy.restore();
            done();
        });
    });

    let req;
    let ctx;

    beforeEach(() => {
        req = {
            method: 'GET',
            session: {
                language: 'en',
                form: {
                    caseType: 'gop',
                    ccdCase: {
                        id: 1234567890123456,
                        state: 'Pending'
                    }
                },
                caseType: 'gop',
                journey: probateJourney,
            },
            sessionID: 'abc123'
        };
        ctx = {
            estateValueCompleted: 'optionYes',
            ihtFormEstateId: ''
        };
    });

    describe('next()', () => {
        it('should return HmrcLetter step when ihtFormEstateId is optionIHT400', () => {
            const req = {
                session: {
                    journey: {} // Mock the journey data
                }
            };
            const ctx = {
                ihtFormEstateId: 'optionIHT400'
            };
            // Stub the static method nextStepOptions on the SubmittedToHmrc class
            const nextStepOptionsStub = sinon.stub(SubmittedToHmrc, 'nextStepOptions').returns({
                options: [
                    {key: 'optionIHT400', value: 'optionIHT400', choice: 'optionIHT400'},
                    {key: 'optionIHT400421', value: 'optionIHT400421', choice: 'optionIHT400421'},
                    {key: 'optionNotRequired', value: 'optionNotRequired', choice: 'optionNotRequired'}
                ]
            });
            const result = SubmittedToHmrc.next(req, ctx);
            expect(result).toString()
                .includes('HmrcLetter');
            // eslint-disable-next-line no-unused-expressions
            expect(ctx.estateValueCompleted).to.be.undefined;
            // eslint-disable-next-line no-unused-expressions
            nextStepOptionsStub.restore();
        });
        it('should set nextStep to IhtEstateValued when optionIHT400', (done) => {
            ctx.ihtFormEstateId = 'optionIHT400';
            const expectedStep = steps.UniqueProbateCode;
            const returnedStep = SubmittedToHmrc.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
        it('should set nextStep to ProbateEstateValues when optionIHT400421', (done) => {
            ctx.ihtFormEstateId = 'optionIHT400421';
            const expectedStep = steps.ProbateEstateValues;
            const returnedStep = SubmittedToHmrc.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
        it('should set nextStep to IhtEstateValues when not IHT400 or IHT400421', (done) => {
            ctx.ihtFormEstateId = 'optionNotRequired';
            const expectedStep = steps.IhtEstateValues;
            const returnedStep = SubmittedToHmrc.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = SubmittedToHmrc.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'optionIHT400',
                    value: 'optionIHT400',
                    choice: 'optionIHT400'
                },
                {
                    key: 'optionIHT400421',
                    value: 'optionIHT400421',
                    choice: 'optionIHT400421'
                },
                {
                    key: 'optionNotRequired',
                    value: 'optionNotRequired',
                    choice: 'optionNotRequired'

                }]
            });
            done();
        });
    });
});
