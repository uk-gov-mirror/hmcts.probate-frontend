'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const json = require('app/resources/en/translation/iht/method');

class IhtMethod extends ValidationStep {

    static getUrl() {
        return '/iht-method';
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'method', value: json.onlineOption, choice: 'online'}
            ]
        };
    }

    clearFormData(ctx, sessionForm) {
        const fieldToCheckSection = 'iht';
        const fieldToCheck = 'method';
        const dataToClear = {
            identifier: 'iht.identifier',
            form: 'iht.form',
            ihtFormId: 'iht.ihtFormId',
            grossValueOnline: 'iht.grossValueOnline',
            grossIHT205: 'iht.grossIHT205',
            grossIHT207: 'iht.grossIHT207',
            grossIHT400421: 'iht.grossIHT400421',
            grossValue: 'iht.grossValue',
            netValueOnline: 'iht.netValueOnline',
            netIHT205: 'iht.netIHT205',
            netIHT207: 'iht.netIHT207',
            netIHT400421: 'iht.netIHT400421',
            netValue: 'iht.netValue'
        };

        return super.clearFormData(ctx, sessionForm, fieldToCheckSection, fieldToCheck, dataToClear);
    }
}

module.exports = IhtMethod;
