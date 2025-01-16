const parsePhoneNumber = require('libphonenumber-js/mobile').parsePhoneNumber;

class PhoneNumberValidator {
    static validateMobilePhoneNumber(phoneNumber) {
        const MIN_PHONE_LENGTH = 11;
        const MAX_PHONE_LENGTH = 15;

        try {
            const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 'GB');
            if (parsedPhoneNumber && parsedPhoneNumber.isValid()) {
                return {isValid: true};
            } else if (phoneNumber.length < MIN_PHONE_LENGTH) {
                return {isValid: false, errorType: 'tooShort'};
            } else if (phoneNumber.length > MAX_PHONE_LENGTH) {
                return {isValid: false, errorType: 'tooLong'};
            }
            return {isValid: false, errorType: 'invalid'};
        } catch (error) {
            return {isValid: false, errorType: 'invalid'};
        }
    }
}

module.exports = PhoneNumberValidator;
