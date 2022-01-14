'use strict';

const config = require('config');

class IhtEstateValuesUtil {
    static withinRange(netQualifyingValue) {
        const range = config.estateQualifyingValueRange;
        return netQualifyingValue > range.min && netQualifyingValue < range.max;
    }
    static isPositiveInteger(value) {
        // eslint-disable-next-line no-bitwise
        return value >>> 0 === parseFloat(value);
    }
}

module.exports = IhtEstateValuesUtil;
