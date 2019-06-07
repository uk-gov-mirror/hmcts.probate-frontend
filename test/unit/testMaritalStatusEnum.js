const MartialStatusEnum = require('app/utils/MaritalStatusEnum');
const content = require('app/resources/en/translation/deceased/maritalstatus');
const expect = require('chai').expect;

describe('MaritalStatusEnum.js', () => {

    describe('getMartialStatusCCDCode()', () => {
        it('should return Widowed value', (done) => {
            expect(MartialStatusEnum.getCCDCode(content.optionWidowed)).to.equal(MartialStatusEnum.getWidowed());
            done();
        });
        it('should return marriedCivilPartnership value', (done) => {
            expect(MartialStatusEnum.getCCDCode(content.optionMarried)).to.equal(MartialStatusEnum.getMarriedCivilPartnerhip());
            done();
        });
        it('should return divorcedCivilPartnership value', (done) => {
            expect(MartialStatusEnum.getCCDCode(content.optionDivorced)).to.equal(MartialStatusEnum.getDivorcedCivilPartnerShip());
            done();
        });
        it('should return judicially value', (done) => {
            expect(MartialStatusEnum.getCCDCode(content.optionSeparated)).to.equal(MartialStatusEnum.getJudicially());
            done();
        });
        it('should return never married value', (done) => {
            expect(MartialStatusEnum.getCCDCode(content.optionNotMarried)).to.equal(MartialStatusEnum.getNeverMarried());
            done();
        });
        it('should return unknown value', (done) => {
            expect(() => MartialStatusEnum.getCCDCode('unknown')).to.throw('Enumerator MartialStatusEnum value: unknown not found');
            done();
        });
    });

});
