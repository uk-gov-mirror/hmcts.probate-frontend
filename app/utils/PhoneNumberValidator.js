const validator = require('validator');

class PhoneNumberValidator {
    static validateUKMobilePhoneNumber(num) {
        const ukNumberMatchRE = new RegExp(/^7[0-9]{9}$/);
        const ukPrefix = '44';

        if (num.startsWith('+')) {
            let toValidate = num.slice(1);
            if (toValidate.startsWith(ukPrefix)) {
                toValidate = toValidate.slice(2);
                if (toValidate.match(ukNumberMatchRE)) {
                    return true;
                }
            } else if (validator.isInt(toValidate)) {
                return true;
            }
        }

        if (num.startsWith('07')) {
            const toValidate = num.slice(1);
            if (toValidate.match(ukNumberMatchRE)) {
                return true;
            }
        }

        return false;
    }
}

module.exports = PhoneNumberValidator;
