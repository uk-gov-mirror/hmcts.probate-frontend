const WillWrapper = require('app/wrappers/Will');
const expect = require('chai').expect;

describe('Will', () => {
    describe('hasCodicils()', () => {
        it('should return true when there are codicils', (done) => {
            const data = {codicils: 'optionYes'};
            const willWrapper = new WillWrapper(data);
            expect(willWrapper.hasCodicils()).to.equal(true);
            done();
        });

        describe('should return false', () => {
            it('when there are no codicils', (done) => {
                const data = {codicils: 'optionNo'};
                const willWrapper = new WillWrapper(data);
                expect(willWrapper.hasCodicils()).to.equal(false);
                done();
            });

            it('when there is no codicils property', (done) => {
                const data = {};
                const willWrapper = new WillWrapper(data);
                expect(willWrapper.hasCodicils()).to.equal(false);
                done();
            });

            it('when there is no will data', (done) => {
                const willWrapper = new WillWrapper();
                expect(willWrapper.hasCodicils()).to.equal(false);
                done();
            });
        });
    });

    describe('codicilsNumber()', () => {
        it('should return the number of codicils when there is a codicils number', (done) => {
            const data = {codicilsNumber: 2};
            const willWrapper = new WillWrapper(data);
            expect(willWrapper.codicilsNumber()).to.equal(2);
            done();
        });

        describe('should return 0', () => {
            it('when there is no codicilsNumber property', (done) => {
                const data = {};
                const willWrapper = new WillWrapper(data);
                expect(willWrapper.codicilsNumber()).to.equal(0);
                done();
            });

            it('when there is no will data', (done) => {
                const willWrapper = new WillWrapper();
                expect(willWrapper.codicilsNumber()).to.equal(0);
                done();
            });
        });
    });
    describe('resetValues()', () => {
        it('should reset values for no damage', (done) => {
            const ctx = {
                willDamageReasonKnown: 'optionYes',
                willDamageReasonDescription: 'desc',
                willDamageCulpritKnown: 'optionYes',
                willDamageCulpritName: {
                    firstName: 'fn',
                    lastName: 'ln'
                },
                willDamageDateKnown: 'optionYes',
                willDamageDate: '/12/2020'
            };
            const willWrapper = new WillWrapper().resetValues(ctx);
            expect(willWrapper.willDamageReasonKnown).to.equal('optionNo');
            expect(willWrapper.willDamageReasonDescription).to.equal('');
            expect(willWrapper.willDamageCulpritKnown).to.equal('optionNo');
            // expect(willWrapper.willDamageCulpritName.firstName).to.be.undefined();
            // expect(willWrapper.willDamageCulpritName.lastName).to.be.undefined();
            expect(willWrapper.willDamageDateKnown).to.equal('optionNo');
            expect(willWrapper.willDamageDate).to.equal('');
            done();
        });
    });

});
