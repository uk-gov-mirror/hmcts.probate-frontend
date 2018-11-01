'use strict';

const requireDir = require('require-directory');
const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');
const translations = requireDir(module, '../../app/resources/en/translation');
const {assert} = require('chai');
const he = require('he');

describe('legalDeclarationPDF', () => {
    let testWrapper;
    let sessionData = require('test/data/legalDeclarationPDF');
    const headingMedium = 'heading-medium';
    const headingSmall = 'heading-small';

    beforeEach(() => {
        testWrapper = new TestWrapper('Declaration');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Legal Declaration Object is built', () => {

        it('test legal declaration object populated', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            let legalDeclaration = testWrapper.getStep().buildLegalDeclarationFromHtml(sessionData, response.text);
                            assert.exists(legalDeclaration);
                            //assertPropertyExistsAndIsEqualTo(legalDeclaration.date_created, ?????);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.deceased, sessionData.deceased.deceasedName);
                            assert.isArray(legalDeclaration.headers, 'Headers exists');
                            assert.lengthOf(legalDeclaration.headers, 3, 'Headers array has length of 3');
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.headers[0], translations.declaration.highCourtHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.headers[1], translations.declaration.familyDivisionHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.headers[2], translations.declaration.probateHeader);

                            assert.isArray(legalDeclaration.sections, 'Sections exists');
                            assert.lengthOf(legalDeclaration.sections, 5, 'Headers array has length of 5');
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[0].title, translations.declaration.legalStatementHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[0].declarationItems[0].title, replaceTokens(translations.declaration.legalStatementApplicant, ['Bob Smith','Flat1, Somewhere Rd, No where.']));

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[1].title, translations.declaration.deceasedHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[1].declarationItems[0].title, replaceTokens(translations.declaration.legalStatementDeceased, ['Someone Else','1 February 1900','1 February 2000']));

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[2].title, translations.declaration.deceasedEstateHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[2].declarationItems[0].title, replaceTokens(he.decode(translations.declaration.deceasedEstateValue), ['150000','100000']));
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[2].declarationItems[1].title, replaceTokens(translations.declaration.deceasedEstateLand, ['Someone Else','Someone Else']));

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[3].title, translations.declaration.executorApplyingHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[3].declarationItems[0].title, replaceTokens(translations.declaration.applicantName, ['Bob Smith']));
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[3].declarationItems[1].title, replaceTokens(translations.declaration.applicantSign, ['Someone Else']));

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].title, translations.declaration.declarationHeader);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[0].title, replaceTokens(translations.declaration.declarationConfirm, ['Someone Else']));
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[0].values[0], translations.declaration.declarationConfirmItem1);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[0].values[1], translations.declaration.declarationConfirmItem2);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[0].values[2], translations.declaration.declarationConfirmItem3);

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[1].title, translations.declaration.declarationRequests);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[1].values[0], translations.declaration.declarationRequestsItem1);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[1].values[1], translations.declaration.declarationRequestsItem2);

                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[2].title, replaceTokens(translations.declaration.declarationUnderstand, ['Bob Smith']));
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[2].values[0], translations.declaration.declarationUnderstandItem1);
                            assertPropertyExistsAndIsEqualTo(legalDeclaration.sections[4].declarationItems[2].values[1], translations.declaration.declarationUnderstandItem2);

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

            function replaceTokens(searchstring, tokenlist) {
                let result = searchstring;
                for (var i = 0, len = tokenlist.length; i < len; i++) {
                    result = result.replace(RegExp("{[a-z0-9]*}","i"), tokenlist[i]);
                }
                return result;
            }
        });
    });
});
