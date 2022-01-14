'use strict';

const config = require('config');

class IhtEstateValuesUtil {
    static withinRange(netQualifyingValue) {
        const range = config.estateQualifyingValueRange;
        return netQualifyingValue > range.min && netQualifyingValue < range.max;
    }
    static isPositiveInteger(value) {
        const pattern = /^[0-9]\d*$/g;
        const result = value.toString().search(pattern);
        return result >= 0;
    }
}

module.exports = IhtEstateValuesUtil;
