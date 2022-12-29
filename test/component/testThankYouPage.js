'use strict';

const TestWrapper = require('test/util/TestWrapper');
const config = require('config');
const content = require('app/resources/en/translation/thankyou');
const caseTypes = require('app/utils/CaseTypes');

describe('thank-you', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('ThankYou');
    });

    afterEach(async () => {
        await testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test content loaded on the page when CCD Case ID not present', (done) => {
            const playbackData = {
                referenceNumber: content.referenceNumber
            };

            testWrapper.testContentNotPresent(done, playbackData);
        });

        it('test content loaded on the page when CCD Case ID present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired',
                'successParagraph2NoDocumentsRequired'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content loaded on the page when CheckAnswers present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP,
                checkAnswersSummary: '{test: "data"}'
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired',
                'successParagraph2NoDocumentsRequired'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content not loaded on the page when exclusively CheckAnswers present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                checkAnswersSummary: '{test: "data"}'
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const playbackData = {
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContentNotPresent(done, playbackData);
                });
        });

        it('test content loaded on the page when LegalDeclaration present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP,
                legalDeclaration: '{test: "data"}'
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired',
                'successParagraph2NoDocumentsRequired'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext,
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content loaded on the page when exclusively LegalDeclaration present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                legalDeclaration: '{test: "data"}'
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const playbackData = {
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContentNotPresent(done, playbackData);
                });
        });

        it('test content loaded on the page when CheckAnswers and LegalDeclaration present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP,
                checkAnswersSummary: '{test: "data"}',
                legalDeclaration: '{test: "data"}'
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired', 'successParagraph2NoDocumentsRequired'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext,
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content loaded on the page so Cover Sheet download is present', (done) => {
            const sessionData = {
                ccdCase: {
                    id: 1234567890123456,
                    state: 'CaseCreated'
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired',
                'successParagraph2NoDocumentsRequired'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext,
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content loaded on the page when documents are required', (done) => {
            const sessionData = {
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.GOP,
                documentsRequired: 'true'
            };
            const contentToExclude = ['documentsParagraph1', 'successParagraph1NoDocumentsRequired',
                'successParagraph2NoDocumentsRequired', 'referenceNumber'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext,
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });

        it('test content loaded on the page when documents not required', (done) => {
            const sessionData = {
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
                caseType: caseTypes.INTESTACY,
                documents: {
                    uploads: ['content']
                }
            };
            const contentToExclude = ['documentsParagraph1', 'documentsParagraph2', 'successParagraph1',
                'successParagraph2', 'referenceNumber'];

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {
                        findOutNext: config.links.findOutNext,
                        downloadApplication: content.downloadParagraph
                    };

                    testWrapper.testContent(done, contentData, contentToExclude);
                });
        });
    });
});
