'use strict';

const common = require('app/resources/en/translation/common.json');
const config = require('app/config');
const {assert} = require('chai');

class TestHelpBlockContent {
    runTest(name, testWrapper, done) {
        describe(name, () => {
            testWrapper.agent.get(testWrapper.pageUrl)
                .then(response => {
                    assert(response.text.includes(common.helpTitle));
                    assert(response.text.includes(common.helpText));
                    assert(response.text.includes(common.contactTelLabel.replace('{helpLineNumber}', config.helpline.number)));
                    assert(response.text.includes(common.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours)));
                    assert(response.text.includes(common.helpEmailLabel));
                    assert(response.text.includes(common.contactEmailAddress));
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    }
}

module.exports = (name, testWrapper, done) => {
    return new TestHelpBlockContent(name, testWrapper, done);
};
