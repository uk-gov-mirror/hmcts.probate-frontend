'use strict';

const requireDir = require('require-directory');
const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');
const translations = requireDir(module, '../../app/resources/en/translation');
const {assert} = require('chai');
const he = require('he');

describe('checkAnswerPDF', () => {
    let testWrapper;
    let sessionData = require('test/data/checkQuestionAnswerPDF');
    const headingMedium = 'heading-medium';
    const headingSmall = 'heading-small';

    beforeEach(() => {
        testWrapper = new TestWrapper('Summary');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Check Answers Summary Object is built', () => {

        it('test check answers summary object populated', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            let checkAnswersSummary = testWrapper.getStep().buildCheckAnswersSummaryFromHtml(response.text);
                            assert.exists(checkAnswersSummary);
                            assertPropertyExistsAndIsEqualTo(checkAnswersSummary.mainParagraph, translations.summary.checkCarefully);
                            assertPropertyExistsAndIsEqualTo(checkAnswersSummary.pageTitle, translations.summary.heading);
                            assert.isArray(checkAnswersSummary.sections, 'Sections exists');
                            assert.lengthOf(checkAnswersSummary.sections, 5, 'Section array has length of 5');

                            let willSection = checkAnswersSummary.sections[0];
                            assertPropertyExistsAndIsEqualTo(willSection.title, translations.summary.willHeading);
                            assertPropertyExistsAndIsEqualTo(willSection.type, headingMedium);

                            assert.isArray(willSection.questionAndAnswers);
                            assert.lengthOf(willSection.questionAndAnswers, 6, 'Will Section array has 6 questionsAndAnswers');

                            assertQuestionAndAnswer(willSection.questionAndAnswers[0], translations.will.left.question, 'Yes' );
                            assertQuestionAndAnswer(willSection.questionAndAnswers[1], translations.will.original.question, 'Yes' );
                            assertQuestionAndAnswer(willSection.questionAndAnswers[2], he.decode(translations.will.codicils.question), 'No' );
                            assertQuestionAndAnswer(willSection.questionAndAnswers[3], translations.deceased.deathcertificate.question, '' );
                            assertQuestionAndAnswer(willSection.questionAndAnswers[4], translations.applicant.executor.question, 'Yes' );
                            assertQuestionAndAnswer(willSection.questionAndAnswers[5], translations.executors.mentalcapacity.question, '' );

                            let ihtSection = checkAnswersSummary.sections[1];
                            assertPropertyExistsAndIsEqualTo(ihtSection.title, translations.summary.ihtHeading);
                            assertPropertyExistsAndIsEqualTo(ihtSection.type, headingMedium);

                            assert.isArray(ihtSection.questionAndAnswers);
                            assert.lengthOf(ihtSection.questionAndAnswers, 5, 'IHT Section array has 5 questionsAndAnswers');

                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[0], translations.iht.completed.question, 'Yes' );
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[1], translations.iht.method.question, 'Through the HMRC online service' );
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[2], translations.iht.identifier.question, '12341234A12345' );
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[3], he.decode(translations.iht.value.grossValue), '150000' );
                            assertQuestionAndAnswer(ihtSection.questionAndAnswers[4], he.decode(translations.iht.value.netValue), '100000' );

                            let executorsSection = checkAnswersSummary.sections[2];
                            assertPropertyExistsAndIsEqualTo(executorsSection.title, translations.summary.applicantHeading);
                            assertPropertyExistsAndIsEqualTo(executorsSection.type, headingMedium);

                            assert.isArray(executorsSection.questionAndAnswers);
                            assert.lengthOf(executorsSection.questionAndAnswers, 1, 'Executors Section array has 1 questionsAndAnswers');
                            assertQuestionAndAnswer(executorsSection.questionAndAnswers[0], he.decode(translations.executors.number.question), '1' );

                            let aboutYouSection = checkAnswersSummary.sections[3];
                            assertPropertyExistsAndIsEqualTo(aboutYouSection.title, translations.summary.aboutYouHeading);
                            assertPropertyExistsAndIsEqualTo(aboutYouSection.type, headingSmall);

                            assert.isArray(aboutYouSection.questionAndAnswers);
                            assert.lengthOf(aboutYouSection.questionAndAnswers, 5, 'About You Section array has 5 questionsAndAnswers');
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[0], translations.applicant.name.firstName, 'Bob' );
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[1], translations.applicant.name.lastName, 'Smith' );
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[2], he.decode(translations.applicant.nameasonwill.question).replace('\{applicantName\}','Bob Smith'), 'Yes' );
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[3], translations.applicant.phone.phoneNumber, '123456780' );
                            assertQuestionAndAnswer(aboutYouSection.questionAndAnswers[4], translations.applicant.address.question, 'Flat 1, Somewhere Rd, Nowhere.' );

                            let aboutThePersonWhoDiedSection = checkAnswersSummary.sections[4];
                            assertPropertyExistsAndIsEqualTo(aboutThePersonWhoDiedSection.title, translations.summary.deceasedHeading);
                            assertPropertyExistsAndIsEqualTo(aboutThePersonWhoDiedSection.type, headingMedium);

                            assert.isArray(aboutThePersonWhoDiedSection.questionAndAnswers);
                            assert.lengthOf(aboutThePersonWhoDiedSection.questionAndAnswers, 8, 'About The Person Who Died Section array has 8 questionsAndAnswers');

                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[0], translations.deceased.name.firstName, 'Someone' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[1], translations.deceased.name.lastName, 'Else' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[2], translations.deceased.alias.question.replace('\{deceasedName\}','SomeoneElse'), 'No' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[3], translations.deceased.married.question.replace('\{deceasedName\}','SomeoneElse'), 'Yes' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[4], translations.deceased.dod.question, '1 February 2000' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[5], translations.deceased.dob.question, '1 February 1900' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[6], translations.deceased.domicile.question, 'live permanently in England or Wales' );
                            assertQuestionAndAnswer(aboutThePersonWhoDiedSection.questionAndAnswers[7], translations.deceased.address.question, '21 Treelined Avenue, Sussex.' );

                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                });

            function assertPropertyExistsAndIsEqualTo(value, equalto) {
                value = value.replace(/\n| /g,'');
                equalto = equalto.replace(/\n| /g,'');
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
