'use strict';

const expect = require('chai').expect;
const AddressWrapper = require('app/wrappers/AddressWrapper');

describe('contact/index.js', () => {

    describe('getFormattedAddress()', () => {
        it('should return the correct full format', (done) => {
            const address = {
                addressLine1: 'line1',
                addressLine2: 'line2',
                addressLine3: 'line3',
                postTown: 'postTown',
                postCode: 'postCode',
                county: 'county',
                country: 'united kingdom'
            };
            const addressWrapper = new AddressWrapper(address);
            expect(addressWrapper.getFormattedAddress()).to.equal('line1 line2 line3 postTown postCode county united kingdom ');
            done();
        });

        it('should return the correct short format', (done) => {
            const address = {
                addressLine1: 'line1',
                postTown: 'postTown',
                postCode: 'postCode'
            };
            const addressWrapper = new AddressWrapper(address);
            expect(addressWrapper.getFormattedAddress()).to.equal('line1 postTown postCode ');
            done();
        });

        it('should return the correct for undefined format', (done) => {
            const address = {
                addressLine1: 'line1',
                addressLine2: '',
                addressLine3: '',
                postTown: 'postTown',
                postCode: 'postCode',
                county: '',
                country: ''
            };
            const addressWrapper = new AddressWrapper(address);
            expect(addressWrapper.getFormattedAddress()).to.equal('line1 postTown postCode ');
            done();
        });
    });
});
