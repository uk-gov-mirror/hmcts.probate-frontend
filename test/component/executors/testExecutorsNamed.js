'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ExecutorsNames = require('app/steps/ui/executors/names');
const ExecutorsAllAlive = require('app/steps/ui/executors/allalive');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');

describe('executors-named', () => {
    let testWrapper, sessionData;
    const expectedNextUrlForExecNames = ExecutorsNames.getUrl();
    const expectedNextUrlForAllAlive = ExecutorsAllAlive.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorsNamed');
        sessionData = {
            type: caseTypes.GOP,
            ccdCase: {
                state: 'Pending',
                id: 1234567890123456
            },
            applicant: {
                'firstName': 'Bobby',
                'lastName': 'Applicant',
                'nameAsOnTheWill': 'optionYes',
                'isApplying': true,
                'isApplicant': true,
                'fullName': 'Bobby Applicant'
            },
            executors: {
                executorsNumber: 2,
                list: [
                    {
                        'fullName': 'Fred Exec One',
                        'isApplying': false
                    },
                    {
                        'fullName': 'Jeff Exec Two',
                        'isApplying': false
                    }
                ]
            }
        };
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ExecutorsNamed', null, null, [], false, {type: caseTypes.GOP,
            ccdCase: {
                state: 'Pending',
                id: 1234567890123456
            },
            applicant: {
                'firstName': 'Bobby',
                'lastName': 'Applicant',
                'nameAsOnTheWill': 'optionYes',
                'isApplying': true,
                'isApplicant': true,
                'fullName': 'Bobby Applicant'
            },
            executors: {
                executorsNumber: 2,
                list: [
                    {
                        'fullName': 'Fred Exec One',
                        'isApplying': false
                    },
                    {
                        'fullName': 'Jeff Exec Two',
                        'isApplying': false
                    }
                ]
            }});

        //working
        it('test redirection to names page when selecting yes with multiple executors', (done) => {
            const data = {executorsNamed: 'optionYes'};
            testWrapper.testRedirect(done, data, expectedNextUrlForExecNames);
        });

        //This should be directing to all alive but on the PR is currently moving to equality
        it('test redirection to equality page when selecting no', (done) => {
            const data = {executorsNamed: 'optionNo'};
            testWrapper.testRedirect(done, data, expectedNextUrlForAllAlive);
        });

        it('test errors message displayed for no number entered', (done) => {
            testWrapper.testErrors(done, {}, 'required');
        });

        //Working on these below
        it('test correct content loaded on the page when lead applicant does not have an alias', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done);
                });
        });

        it('test correct content loaded on the page when lead applicant does have an alias', (done) => {
            sessionData.executors.list[0].fullName = 'Fred Exec One';
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done);
                });
        });

        it('test errors message displayed for invalid data', (done) => {
            const data = {executorsNamed: 'abd'};

            testWrapper.testErrors(done, data, 'invalid');
        });

        it('test errors message displayed for invalid data - negative numbers', (done) => {
            const data = {executorsNamed: '-1'};

            testWrapper.testErrors(done, data, 'invalid');
        });

        it('test it displays the errors when there are more than 20 executors', (done) => {
            const data = {executorsNumber: 21};

            testWrapper.testErrors(done, data, 'invalid');
        });

        it('test errors message displayed for invalid data', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        applicant: ['x']
                    };
                    const errorsToTest = ['executorNamed'];

                    testWrapper.testErrors(done, data, 'invalid', errorsToTest);
                });
        });
    });
});
