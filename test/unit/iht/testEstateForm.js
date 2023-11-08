'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const IhtEstateForm = steps.IhtEstateForm;
const probateJourney = require('app/journeys/probate');

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

describe('EstateForm', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtEstateForm.constructor.getUrl();
            expect(url).to.equal('/estate-form');
            done();
        });
    });

    describe('next()', () => {
        it('should set nextStep to IhtEstateValued when optionIHT400', (done) => {
            ctx.ihtFormEstateId = 'optionIHT400';
            const expectedStep = steps.HmrcLetter;
            const returnedStep = IhtEstateForm.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
        it('should set nextStep to ProbateEstateValues when optionIHT400421', (done) => {
            ctx.ihtFormEstateId = 'optionIHT400421';
            const expectedStep = steps.ProbateEstateValues;
            const returnedStep = IhtEstateForm.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
        it('should set nextStep to IhtEstateValues when not IHT400 or IHT400421', (done) => {
            ctx.ihtFormEstateId = 'optionNotRequired';
            const expectedStep = steps.IhtEstateValues;
            const returnedStep = IhtEstateForm.next(req, ctx);
            expect(returnedStep).to.equal(expectedStep);
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = IhtEstateForm.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'optionIHT400',
                    value: 'optionIHT400',
                    choice: 'optionIHT400'
                }, {
                    key: 'optionIHT400421',
                    value: 'optionIHT400421',
                    choice: 'optionIHT400421'
                },
                {
                    key: 'optionIHT205',
                    value: 'optionIHT205',
                    choice: 'optionIHT205'

                }]
            });
            done();
        });
    });

});
