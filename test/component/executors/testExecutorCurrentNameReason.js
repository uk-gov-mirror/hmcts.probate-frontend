'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ExecutorContactDetails = require('app/steps/ui/executors/contactdetails/index');
const ExecutorCurrentName = require('app/steps/ui/executors/currentname/index');

describe('/executor-current-name-reason/', () => {
    let testWrapper, sessionData;
    const expectedNextUrlForExecContactDetails = ExecutorContactDetails.getUrl();
    const FirstExecURL = ExecutorCurrentName.getUrl(2);

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorCurrentNameReason');
        sessionData = {
            'executors': {
                'list': [
                    {'firstName': 'john', 'lastName': 'theapplicant', 'isApplying': true, 'isApplicant': true},
                    {'fullName': 'executor name1', isApplying: true, hasOtherName: false},
                    {'fullName': 'executor name2', isApplying: true, currentName: 'name2 executor', hasOtherName: true},
                    {'fullName': 'executor name3', isApplying: true, hasOtherName: false},
                    {'fullName': 'executor name4', isApplying: true, hasOtherName: true},
                    {'fullName': 'executor name5', isApplying: true, hasOtherName: false},
                    {'fullName': 'executor name6', isApplying: true, hasOtherName: true}
                ]
            }
        };
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test content loaded on the page', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        executorFullName: 'executor name2',
                    };
                    testWrapper.testContent(done, [], contentData);
            });
        });

        it('test alias reason validation when no data is entered', (done) => {
            const errorsToTest = ['aliasReason'];
            const data = {};

            testWrapper.testErrors(done, data, 'required', errorsToTest);
        });

        it('test alias reason validation when other is selected but no reason is entered', (done) => {
            const errorsToTest = ['otherReason'];
            const data = {
                aliasReason: 'other',
                otherReason: ''
            };

            testWrapper.testErrors(done, data, 'required', errorsToTest);
        });

        it(`test redirects from ExecutorCurrentNameReason to next ExecutorCurrentName, ${FirstExecURL}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        index: 1,
                        aliasReason: 'Marriage'
                    };
                    testWrapper.testRedirect(done, data, FirstExecURL);
                });
        });

        it(`test it redirects last executor to Executor Contact Details step: ${expectedNextUrlForExecContactDetails}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        index: 6,
                        aliasReason: 'Marriage',
                    };
                    testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl(6);
                    testWrapper.testRedirect(done, data, expectedNextUrlForExecContactDetails);
                });
        });
    });
});
