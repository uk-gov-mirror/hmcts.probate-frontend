'use strict';

class AddressWrapper {
    constructor(address) {
        this.address = address || {};
    }

    getFormattedAddress() {
        let formattedAddress = '';
        Object.values(this.address).forEach(value => {
            if (value) {
                formattedAddress = `${formattedAddress}${value} `;
            }
        });
        return formattedAddress;
    }

}

module.exports = AddressWrapper;
