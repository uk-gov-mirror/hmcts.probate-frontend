class PhoneNumberValidator {
    static validateUKMobilePhoneNumber(num) {
        const numberMatchRE = new RegExp(/^[0-9]{10}$/);
        const ukPrefix = '44';

        if (num.startsWith('+')) {
            let toValidate = num.slice(1);
            if (toValidate.startsWith(ukPrefix)) {
                toValidate = toValidate.slice(2);
                if (toValidate.match(numberMatchRE)) {
                    return true;
                }
            }
        }

        if (num.startsWith('00')) {
            let toValidate = num.slice(2);
            if (toValidate.startsWith(ukPrefix)) {
                toValidate = toValidate.slice(2);
                if (toValidate.match(numberMatchRE)) {
                    return true;
                }
            }
        }

        if (num.startsWith('07')) {
            const toValidate = num.slice(1);
            if (toValidate.match(numberMatchRE)) {
                return true;
            }
        }

        return false;
    }
}

module.exports = PhoneNumberValidator;
