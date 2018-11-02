'use strict';

const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');
const {assert} = require('chai');

describe('summary', () => {
    let testWrapper;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('Summary');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test content loaded on the page', (done) => {
            const contentToExclude = [
                'executorsWhenDiedQuestion',
                'otherNamesLabel',
                'willWithCodicilHeading',
                'otherExecutors',
                'executorsWithOtherNames',
                'executorApplyingForProbate',
                'executorsNotApplyingForProbate',
                'nameOnWill',
                'currentName',
                'currentNameReason',
                'address',
                'mobileNumber',
                'emailAddress'
            ];
            testWrapper.testContent(done, contentToExclude);
        });

        it('test it redirects to submit', (done) => {

            const sessionData = {
                applicant: {nameAsOnTheWill: 'No'}
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
    describe('Verify Check Answers Summary Object is built', () => {
        let sessionData;
        beforeEach(() => {
            sessionData = require('test/data/complete-form-undeclared').formdata;
        });
        afterEach(() => {
            delete require.cache[require.resolve('test/data/complete-form-undeclared')];
            testWrapper.destroy();
        });

        it('test check answers summary object populated', (done) => {

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            const checkAnswersSummary = testWrapper.getStep().buildCheckAnswersSummaryFromHtml(response.text);
                            assert.exists(checkAnswersSummary);
                            assertPropertyExistsAndIsEqualTo(checkAnswersSummary.mainParagraph,
                                'Check the information below carefully. This will form a record of your application for probate. It will also be stored as a public record, and will be able to be viewed online.');
                            assertPropertyExistsAndIsEqualTo(checkAnswersSummary.pageTitle, '\n' +
                                '        Check your answers\n' +
                                '    ');
                            assert.isArray(checkAnswersSummary.sections, 'Sections exists');
                            assert.lengthOf(checkAnswersSummary.sections, 5, 'Section array has length of 5');

                            const willSection = checkAnswersSummary.sections[0];
                            assertPropertyExistsAndIsEqualTo(willSection.title, '\n' +
                                '        The will\n' +
                                '    ');
                            assertPropertyExistsAndIsEqualTo(willSection.type, 'heading-medium');

                            assert.isArray(willSection.questionAndAnswers);
                            assert.lengthOf(willSection.questionAndAnswers, 6, 'Will Section array has 6 questionsAndAnswers');

                            assertQuestionAndAnswer(willSection.questionAndAnswers[0], 'Did the person who died leave a will?', 'Yes');
                            assertQuestionAndAnswer(willSection.questionAndAnswers[1], 'Do you have the original will?', 'Yes');
                            assertQuestionAndAnswer(willSection.questionAndAnswers[2], 'Were any updates (‘codicils’) made to the will?', 'No');
                            assertQuestionAndAnswer(willSection.questionAndAnswers[3], 'Do you have a death certificate?', '');
                            assertQuestionAndAnswer(willSection.questionAndAnswers[4], 'Are you named as an executor on the will?', 'Yes');
                            assertQuestionAndAnswer(willSection.questionAndAnswers[5], 'Are all the executors able to make their own decisions?', '');

                            const ihtSection = checkAnswersSummary.sections[1];
                            assertPropertyExistsAndIsEqualTo(ihtSection.title, 'Inheritance tax');
                            assertPropertyExistsAndIsEqualTo(ihtSection.type, 'heading-medium');

                            assert.isArray(ihtSection.questionAndAnswers);
                            assert.lengthOf(ihtSection.questionAndAnswers, 5, 'IHT Section array has 5 questionsAndAnswers');

                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[0], 'Has an Inheritance Tax (IHT) form been filled in?', 'Yes');
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[1], 'How was the Inheritance Tax (IHT) form submitted?', 'Through the HMRC online service');
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[2], 'Inheritance Tax identifier (IHT)', '12341234A12345');
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[3], 'Gross value of the estate in £', '150000');
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[4], 'Net value of the estate in £', '100000');

                            const executorsSection = checkAnswersSummary.sections[2];
                            assertPropertyExistsAndIsEqualTo(executorsSection.title, 'The executors');
                            assertPropertyExistsAndIsEqualTo(executorsSection.type, 'heading-medium');

                            assert.isArray(executorsSection.questionAndAnswers);
                            assert.lengthOf(executorsSection.questionAndAnswers, 1, 'Executors Section array has 1 questionsAndAnswers');
                            assertQuestionAndAnswer(executorsSection.questionAndAnswers[0], 'How many past and present executors are named on the will and any updates (‘codicils’)?', '1');

                            const aboutYouSection = checkAnswersSummary.sections[3];
                            assertPropertyExistsAndIsEqualTo(aboutYouSection.title, 'About you');
                            assertPropertyExistsAndIsEqualTo(aboutYouSection.type, 'heading-small');

                            assert.isArray(aboutYouSection.questionAndAnswers);
                            assert.lengthOf(aboutYouSection.questionAndAnswers, 5, 'About You Section array has 5 questionsAndAnswers');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[0], 'First name(s)', 'Bob');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[1], 'Last name(s)', 'Smith');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[2], 'Is your name ‘Bob Smith’ exactly what appears on the will?', 'Yes');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[3], 'Phone number', '123456780');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[4], 'What is your address?', 'Flat 1, Somewhere Rd, Nowhere.');

                            const aboutThePersonWhoDiedSection = checkAnswersSummary.sections[4];
                            assertPropertyExistsAndIsEqualTo(aboutThePersonWhoDiedSection.title, 'About the person who died');
                            assertPropertyExistsAndIsEqualTo(aboutThePersonWhoDiedSection.type, 'heading-medium');

                            assert.isArray(aboutThePersonWhoDiedSection.questionAndAnswers);
                            assert.lengthOf(aboutThePersonWhoDiedSection.questionAndAnswers, 8, 'About The Person Who Died Section array has 8 questionsAndAnswers');

                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[0], 'First name(s)', 'Someone');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[1], 'Last name(s)', 'Else');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[2], 'Did Someone Else have assets in another name?', 'No');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[3], 'Did Someone Else get married or enter into a civil partnership after the will was signed?', 'Yes');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[4], 'What was the date that they died?', '1 February 2000');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[5], 'What was their date of birth?', '1 February 1900');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[6], 'At the time of their death did the person who died:', 'live permanently in England or Wales');
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[7], 'What was the permanent address at the time of their death?', '21 Treelined Avenue, Sussex.');

                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                });
            function assertPropertyExistsAndIsEqualTo(value, equalto) {
                assert.exists(value);
                assert.equal(value, equalto);
            }

            function assertQuestionAndAnswer(questionAndAnswers, question, answer) {
                assertPropertyExistsAndIsEqualTo(questionAndAnswers.question, question);
                assert.isArray(questionAndAnswers.answers);
                assert.lengthOf(questionAndAnswers.answers, 1);
                assertPropertyExistsAndIsEqualTo(questionAndAnswers.answers[0], answer);
            }
        });
    });
});
