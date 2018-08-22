const common = require('app/config');
const {assert} = require('chai');

class importedTest {
    runTest(name, testWrapper, done) {
        describe(name, () => {
            testWrapper.agent.get(testWrapper.pageUrl)
                .then(response => {
                    assert(response.text.includes(common.helpTitle));
                    assert(response.text.includes(common.helpText));
                    assert(response.text.includes(common.contactTelLabel));
                    assert(response.text.includes(common.contactOpeningTimes));
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
    return new importedTest(name, testWrapper, done);
};
