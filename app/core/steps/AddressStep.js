'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class AddressStep extends ValidationStep {

    handleGet(ctx, formdata) {
        if (ctx.errors) {
            const errors = ctx.errors;
            delete ctx.errors;
            if (formdata) {
                delete formdata[this.section].errors;
            }
            return [ctx, errors];
        }
        return [ctx];
    }

    handlePost(ctx, errors) {
        ctx.address = {
            addressLine1: ctx.addressLine1,
            addressLine2: ctx.addressLine2,
            addressLine3: ctx.addressLine3,
            postTown: ctx.townOrCity,
            county: ctx.county,
            postCode: ctx.newPostCode,
            country: ctx.country,
        };
        ctx.postcode = ctx.postcode ? ctx.postcode.toUpperCase() : ctx.postcode;
        if (!ctx.postcodeAddress) {
            delete ctx.addresses;
        }
        delete ctx.referrer;
        delete ctx.addressLine1;
        delete ctx.addressLine2;
        delete ctx.addressLine3;
        delete ctx.townOrCity;
        delete ctx.county;
        delete ctx.newPostCode;
        delete ctx.country;
        return [ctx, errors];
    }
}

module.exports = AddressStep;
