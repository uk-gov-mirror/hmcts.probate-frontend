'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ExecutorsNames = require('app/steps/ui/executors/names');
const Equality = require('app/steps/ui/equality');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');

describe('executors-named', () => {
    let testWrapper, sessionData;
    const expectedNextUrlForExecNames = ExecutorsNames.getUrl();
    //const expectedNextUrlForAllAlive = ExecutorsAllAlive.getUrl();
    const expectedNextUrlForEquality = Equality.getUrl();

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
        testCommonContent.runTest('ExecutorsNamed', null, null, [], false, {type: caseTypes.GOP});

        //working
        it('test redirection to names page when selecting yes with multiple executors', (done) => {
            const data = {executorsNamed: 'optionYes'};
            testWrapper.testRedirect(done, data, expectedNextUrlForExecNames);
        });
        //need to look into this
        /*it('test redirection to all alive page when selecting no', (done) => {
            const data = {
                executors: {
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
                },
                applicant: {'firstName': 'Bobby', 'lastName': 'Applicant', 'nameAsOnTheWill': 'optionYes', 'isApplying': true, 'isApplicant': true, 'fullName': 'Bobby Applicant'},
                executorsNamed: 'optionNo'};
            testWrapper.testRedirect(done, data, expectedNextUrlForAllAlive);
        });*/

        it('test redirection to equality page when selecting no', (done) => {
            const data = {list: [{
                'fullName': 'Jeff Exec Two',
                'isApplying': false
            }],
            executorsNamed: 'optionNo'};
            testWrapper.testRedirect(done, data, expectedNextUrlForEquality);
        });

        it('test errors message displayed for no number entered', (done) => {
            testWrapper.testErrors(done, {}, 'required');
        });

        //Working on these below
        it('test correct content loaded on the page when lead applicant does not have an alias', (done) => {
            const contentToExclude = ['titleWithCodicil', 'hintTextWithCodicil'];
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, {}, contentToExclude);
                });
        });

        it('test correct content loaded on the page when lead applicant does have an alias', (done) => {
            const contentToExclude = ['titleWithCodicil', 'hintTextWithCodicil'];
            sessionData.executors.list[0].fullName = 'Fred Exec One';
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, {}, contentToExclude);
                });
        });

        it('test errors message displayed for required data', (done) => {
            testWrapper.testErrors(done, {}, 'required');
        });
    });
});
