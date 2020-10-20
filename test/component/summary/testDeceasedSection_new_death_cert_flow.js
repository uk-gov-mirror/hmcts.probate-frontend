'use strict';

const requireDir = require('require-directory');
const TestWrapper = require('test/util/TestWrapper');
const languageContent = require('../../../app/resources/en/translation/language');
const deceasedContent = requireDir(module, '../../../app/resources/en/translation/deceased');
const willContent = requireDir(module, '../../../app/resources/en/translation/will');
const FormatName = require('app/utils/FormatName');
const probateNewJourney = require('app/journeys/probatenewdeathcertflow');

describe('summary-deceased-section-new', () => {
    const ftValue = {ft_new_deathcert_flow: true};
    let testWrapper, sessionData;

    beforeEach(() => {
        testWrapper = new TestWrapper('Summary', ftValue, probateNewJourney);
        sessionData = require('test/data/deceased_new_death_cert_flow');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test correct content loaded on the deceased section of the summary page, when no data is entered', (done) => {
            sessionData = {
                ccdCase: {
                    state: 'Pending',
                    id: 1234567890123456
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end((err) => {
                    if (err) {
                        throw err;
                    }
                    const playbackData = {
                        bilingual: languageContent.question,
                        firstName: deceasedContent.name.firstName,
                        lastName: deceasedContent.name.lastName,
                        alias: deceasedContent.alias.question.replace('{deceasedName}', deceasedContent.alias.theDeceased),
                        dob: deceasedContent.dob.question,
                        dod: deceasedContent.dod.question,
                        address: deceasedContent.address.question,
                        diedEngOrWales: deceasedContent.diedengorwales.question.replace('{deceasedName}', deceasedContent.alias.theDeceased),
                        willCodicils: willContent.codicils.question
                    };

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });

        it('test correct content loaded on the deceased section of the summary page, when section is complete', (done) => {
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
                    delete require.cache[require.resolve('test/data/deceased_new_death_cert_flow')];
                    const deceasedName = FormatName.format(sessionData.deceased);
                    const playbackData = {
                        bilingual: languageContent.question,
                        firstName: deceasedContent.name.firstName,
                        lastName: deceasedContent.name.lastName,
                        alias: deceasedContent.alias.question.replace('{deceasedName}', deceasedName),
                        married: deceasedContent.married.question.replace('{deceasedName}', deceasedName),
                        dob: deceasedContent.dob.question,
                        dod: deceasedContent.dod.question,
                        address: deceasedContent.address.question,
                        diedEngOrWales: deceasedContent.diedengorwales.question.replace('{deceasedName}', deceasedName),
                        englishForeignDeathCert: deceasedContent.englishforeigndeathcert.question,
                        foreignDeathCertTranslation: deceasedContent.foreigndeathcerttranslation.question,
                        willCodicils: willContent.codicils.question
                    };

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });

        it('test data is played back correctly on the deceased section of the summary page', (done) => {
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
                    delete require.cache[require.resolve('test/data/deceased_new_death_cert_flow')];
                    const deceasedName = FormatName.format(sessionData.deceased);
                    const playbackData = {
                        questionBilingual: languageContent.question,
                        questionFirstName: deceasedContent.name.firstName,
                        questionLastName: deceasedContent.name.lastName,
                        questionAlias: deceasedContent.alias.question.replace('{deceasedName}', deceasedName),
                        questionMarried: deceasedContent.married.question.replace('{deceasedName}', deceasedName),
                        questionDob: deceasedContent.dob.question,
                        questionDod: deceasedContent.dod.question,
                        questionAddress: deceasedContent.address.question,
                        questionDiedEngOrWales: deceasedContent.diedengorwales.question.replace('{deceasedName}', deceasedName),
                        questionEnglishForeignDeathCert: deceasedContent.englishforeigndeathcert.question,
                        questionForeignDeathCertTranslation: deceasedContent.foreigndeathcerttranslation.question,
                        questionWillCodicils: willContent.codicils.question
                    };
                    Object.assign(playbackData, sessionData.deceased);
                    playbackData.alias = deceasedContent.alias[playbackData.alias];
                    playbackData.married = deceasedContent.married[playbackData.married];
                    playbackData.domicile = deceasedContent.married[playbackData.domicile];
                    playbackData.diedEngOrWales = deceasedContent.diedengorwales[playbackData.diedEngOrWales];
                    playbackData.englishForeignDeathCert = deceasedContent.englishforeigndeathcert[playbackData.englishForeignDeathCert];
                    playbackData.foreignDeathCertTranslation = deceasedContent.foreigndeathcerttranslation[playbackData.foreignDeathCertTranslation];

                    playbackData.address = sessionData.deceased.address.formattedAddress;

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });
    });
});
