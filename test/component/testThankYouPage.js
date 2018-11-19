'use strict';

const TestWrapper = require('test/util/TestWrapper');
const config = require('app/config');

describe('thank-you', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('ThankYou');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test content loaded on the page when CCD Case ID not present', (done) => {
            const sessionData = {};
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const excludeKeys = ['referenceNumber'];

                    const contentData = {
                        helpLineNumber: config.helpline.number,
                        findOutNext: config.links.findOutNext
                    };

                    testWrapper.testContent(done, excludeKeys, contentData);
                });
        });

        it('test content loaded on the page when CCD Case ID present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: '1234-5678-9012-3456'
                }
            };
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        helpLineNumber: config.helpline.number,
                        findOutNext: config.links.findOutNext
                    };

                    testWrapper.testContent(done, [], contentData);
                });
        });
    });
});
