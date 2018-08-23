'use strict';

const common = require('app/resources/en/translation/common.json');
const config = require('app/config');

class TestHelpBlockContent {
    static runTest(name, testWrapper, done) {
        describe(name, () => {
            testWrapper.agent.get(testWrapper.pageUrl)
                .then(() => {
                    const playbackData = {};
                    playbackData.helpTitle = common.helpTitle;
                    playbackData.helpText = common.helpText;
                    playbackData.contactTelLabel = common.contactTelLabel.replace('{helpLineNumber}', config.helpline.number);
                    playbackData.contactOpeningTimes = common.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours);
                    playbackData.helpEmailLabel = common.helpEmailLabel;
                    playbackData.contactEmailAddress = common.contactEmailAddress;

                    testWrapper.testDataPlayback(done, playbackData);
                })
                .catch(err => {
                    done(err);
                });
        });
    }
}

module.exports = () => {
    return TestHelpBlockContent;
};
