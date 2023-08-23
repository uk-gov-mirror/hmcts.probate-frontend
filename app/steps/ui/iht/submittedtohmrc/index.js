'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const JourneyMap = require('../../../../core/JourneyMap');

class SubmittedToHMRC extends ValidationStep {

    static getUrl() {
        return '/submitted-to-hmrc';
    }

    next(req, ctx) {
        const journeyMap = new JourneyMap(req.session.journey);
        ctx.estateValueCompleted = 'optionYes';
        if (ctx.ihtFormEstateId === 'optionIHT400') {
            return journeyMap.getNextStepByName('HmrcCheck'); // Update when DTSPB-3705 is implemented
        } else if (ctx.ihtFormEstateId === 'optionIHT400421') {
            return journeyMap.getNextStepByName('ProbateEstateValues');
        }
        return journeyMap.getNextStepByName('IhtEstateValues');
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'optionIHT400', value: 'optionIHT400', choice: 'optionIHT400'},
                {key: 'optionIHT400421', value: 'optionIHT400421', choice: 'optionIHT400421'}
            ]
        };
    }

}

module.exports = SubmittedToHMRC;
