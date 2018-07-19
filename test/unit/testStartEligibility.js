const initSteps = require('app/core/initSteps');
const assert = require('chai').assert;

describe('StartEligibility', () => {

    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    const startEligibility = steps.StartEligibility;

    it('test correct url is returned from getUrl function', () => {
        assert.equal(startEligibility.constructor.getUrl(), '/start-eligibility');
    });
});
