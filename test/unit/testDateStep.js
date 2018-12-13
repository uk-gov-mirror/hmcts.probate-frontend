'use strict';

const {expect} = require('chai');
const DateStep = require('app/core/steps/DateStep');
const moment = require('moment');
const config = require('app/config');

describe('DateStep', () => {
    const steps = {};
    const section = 'deceased';
    const resourcePath = 'deceased/dob';
    const i18next = {};
    const schema = require('app/steps/ui/deceased/dob/schema');
    const dateStep = new DateStep(steps, section, resourcePath, i18next, schema);

    describe('getContextData()', () => {
        it('should return the correct ctx with a parsed date', (done) => {
            const req = {
                session: {
                    form: {
                        deceased: {
                            firstName: 'Dee',
                            lastName: 'Ceased',
                            dob_day: '15',
                            dob_month: '12',
                            dob_year: '1956',
                            dod_day: '4',
                            dod_month: '6',
                            dod_year: '2018'
                        }
                    }
                }
            };
            const ctx = dateStep.getContextData(req);

            expect(ctx).to.equal({});
            done();
        });
    });

    describe('parseDate()', () => {
        let ctx;

        it('should parse an invalid date and store it in the context as null', (done) => {
            const dateNames = ['dob', 'dod'];
            ctx = {
                dob_day: '15',
                dob_month: '13',
                dob_year: '1956',
                dod_day: '4',
                dod_month: '6',
                dod_year: '2018'
            };
            dateStep.parseDate(ctx, dateNames);
            expect(ctx).to.deep.equal({
                dob_day: 15,
                dob_month: 13,
                dob_year: 1956,
                dob_date: null,
                dod_day: 4,
                dod_month: 6,
                dod_year: 2018,
                dod_date: '2018-06-03T23:00:00.000Z',
                dod_formattedDate: '4 June 2018'
            });
            done();
        });

        it('should parse a valid date and store it in the context', (done) => {
            const dateNames = ['dob', 'dod'];
            ctx = {
                dob_day: '15',
                dob_month: '12',
                dob_year: '1956',
                dod_day: '4',
                dod_month: '6',
                dod_year: '2018'
            };
            dateStep.parseDate(ctx, dateNames);
            expect(ctx).to.deep.equal({
                dob_day: 15,
                dob_month: 12,
                dob_year: 1956,
                dob_date: '1956-12-15T00:00:00.000Z',
                dob_formattedDate: '15 December 1956',
                dod_day: 4,
                dod_month: 6,
                dod_year: 2018,
                dod_date: '2018-06-03T23:00:00.000Z',
                dod_formattedDate: '4 June 2018'
            });
            done();
        });
    });

    describe('formattedDate()', () => {
        it('should return a formatted date', (done) => {
            const testDate = moment('12/12/2018', config.dateFormat);
            const returnDate = dateStep.formattedDate(testDate);

            expect(returnDate).to.equal('12 December 2018');
            done();
        });
    });
});
