'use strict';

const requireDir = require('require-directory');
const TestWrapper = require('test/util/TestWrapper');
const willContent = requireDir(module, '../../../app/resources/en/translation/will');

describe('summary-will-section', () => {
    let testWrapper, sessionData;

    beforeEach(() => {
        testWrapper = new TestWrapper('Summary');
        sessionData = require('test/data/will');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test correct content loaded on the will section of the summary page, when no data is entered', (done) => {
            sessionData = require('test/data/will-noDamage');
            sessionData.ccdCase = {
                state: 'Pending',
                id: 1234567890123456
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end((err) => {
                    if (err) {
                        throw err;
                    }
                    const playbackData = {
                        willHasVisibleDamage: willContent.willhasvisibledamage.question
                    };

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });

        it('test correct content and data loaded on the will section of the summary page, when section is complete', (done) => {
            sessionData.ccdCase = {
                state: 'Pending',
                id: 1234567890123456
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end((err) => {
                    if (err) {
                        throw err;
                    }
                    delete require.cache[require.resolve('test/data/will')];
                    const playbackData = {
                        willHasVisibleDamage: willContent.willhasvisibledamage.question,
                        otherDamageDescriptionHint: willContent.willhasvisibledamage.otherDamageDescriptionHint,
                        otherDamage: 'Other damage',
                        selectedDamage1: willContent.willhasvisibledamage.optionstapleOrPunchHoles,
                        selectedDamage2: willContent.willhasvisibledamage.optionotherVisibleDamage,
                        damageReasonKnown: willContent.willdamagereasonknown.question,
                        willDamageReasonDescriptionTitle: willContent.willdamagereasonknown.willDamageReasonDescriptionTitle,
                        culpritQuestion: willContent.willdamageculpritknown.question,
                        culpritFirstName: willContent.willdamageculpritknown.firstName,
                        culpritLastName: willContent.willdamageculpritknown.lastName
                    };

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });
    });
});
