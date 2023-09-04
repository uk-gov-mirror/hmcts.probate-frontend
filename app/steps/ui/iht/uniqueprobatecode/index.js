'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const validator = require('validator');
const FieldError = require('app/components/error');
//const JourneyMap = require('../../../../core/JourneyMap');
// const {get} = require('lodash');
// const FieldError = require('app/components/error');
//const JourneyMap = require('../../../../core/JourneyMap');

class UniqueProbateCode extends ValidationStep {
    static getUrl() {
        return '/unique-probate-code';
    }
    handlePost(ctx, errors, session) {

        const code = ctx.uniqueProbateCodeId;
        const noSpaceCode = removeSpace(code);
        function removeSpace(code) {
            if (!code.includes(' ')) {
                return code;
            }
            return code.replace(/\s+/g, '');
        }

        const containSpecialCharacters = specialCharactersCheck(noSpaceCode);

        function specialCharactersCheck(noSpaceCode) {
            const specialChars = /[!@#$%^&*()_+{}[\]:;<>,.?~\\]/;

            return specialChars.test(noSpaceCode);

        }

        console.log(noSpaceCode);

        if (noSpaceCode.length > 18) {
            // throw an error saying code is too long

            errors.push(FieldError('uniqueProbateCodeId', 'length', this.resourcePath, this.generateContent({}, {}, session.language), session.language));

        } else if (containSpecialCharacters && !validator.isAlphanumeric(noSpaceCode)) {
            // throw an error saying string contains special character and is not alphanumeric
        } else {
            // save the probate code into case data
        }

        return [ctx, errors];

    }

}

module.exports = UniqueProbateCode;
