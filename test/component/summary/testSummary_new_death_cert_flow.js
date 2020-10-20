'use strict';

const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist');
const probateNewJourney = require('app/journeys/probatenewdeathcertflow');

describe('summary', () => {
    const ftValue = {ft_new_deathcert_flow: true};
    let testWrapper;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('Summary', ftValue, probateNewJourney);
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('[INTESTACY] test content loaded on the page', (done) => {
            const sessionData = {
                ccdCase: {
                    state: 'Pending',
                    id: 1234567890123456
                },
                caseType: 'intestacy'
            };
            const contentToExclude = [
                'executorsWhenDiedQuestion',
                'otherNamesLabel',
                'otherExecutors',
                'executorsWithOtherNames',
                'executorApplyingForProbate',
                'executorsNotApplyingForProbate',
                'nameOnWill',
                'currentName',
                'currentNameReason',
                'mobileNumber',
                'emailAddress',
                'uploadedDocumentsHeading',
                'uploadedDocumentsEmpty',
                'applicantHeading'
            ];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, {}, contentToExclude);
                });
        });

        it('test it redirects to submit', (done) => {
            const sessionData = {
                ccdCase: {
                    state: 'Pending',
                    id: 1234567890123456
                },
                applicant: {
                    nameAsOnTheWill: 'optionNo'
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const nextStepData = {softStop: true};

                    testWrapper.agent.get('/summary/redirect')
                        .expect('location', testWrapper.nextStep(nextStepData).constructor.getUrl())
                        .expect(302)
                        .end((err) => {
                            testWrapper.server.http.close();
                            if (err) {
                                done(err);
                            } else {
                                done();
                            }
                        });
                });
        });

        it(`test it redirects to Task List: ${expectedNextUrlForTaskList}`, (done) => {
            const sessionData = {
                ccdCase: {
                    state: 'Pending',
                    id: 1234567890123456
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get('/summary/redirect')
                        .expect('location', expectedNextUrlForTaskList)
                        .expect(302)
                        .end((err) => {
                            testWrapper.server.http.close();
                            if (err) {
                                done(err);
                            } else {
                                done();
                            }
                        });
                });
        });
    });
});
