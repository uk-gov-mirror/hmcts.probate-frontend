const parsePhoneNumber = require('libphonenumber-js/mobile').parsePhoneNumber;

class PhoneNumberValidator {
    static validateMobilePhoneNumber(num) {
        try {
            const parsed = parsePhoneNumber(num, 'GB');
            if (parsed) {
                return parsed.isValid();
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}

module.exports = PhoneNumberValidator;
