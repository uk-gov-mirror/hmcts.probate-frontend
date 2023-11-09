'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const JourneyMap = require('../../../../core/JourneyMap');

class IhtEstateForm extends ValidationStep {

    static getUrl() {
        return '/estate-form';
    }
    next(req, ctx) {
        const journeyMap = new JourneyMap(req.session.journey);
        if (ctx.ihtFormEstateId === 'optionIHT400') {
            return journeyMap.getNextStepByName('UniqueProbateCode'); // Added the new page called HmrcLetter which asks for whether they recived the unique code
        }
        return journeyMap.getNextStepByName('ProbateEstateValues');

    }

    nextStepOptions() {
        return {
            options: [
                {key: 'optionIHT400', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'optionIHT400421', value: 'optionIHT400421', choice: 'optionIHT400421'},
                {key: 'optionIHT205', value: 'optionIHT205', choice: 'optionIHT205'}
            ]
        };
    }
}

module.exports = IhtEstateForm;
