// eslint-disable-line max-lines

'use strict';

const TestWrapper = require('test/util/TestWrapper');
const config = require('config');
const caseTypes = require('app/utils/CaseTypes');
const ThankYou = require('app/steps/ui/thankyou');
const testCommonContent = require('test/component/common/testCommonContent.js');

describe('documents', () => {
    describe('documents', () => {

        let testWrapper;
        const expectedNextUrlForThankYouPage = ThankYou.getUrl();
        let sessionData;
        let contentData;

        beforeEach(() => {
            sessionData = {
                caseType: caseTypes.GOP,
                ccdCase: {
                    state: 'CaseCreated',
                    id: 1234123512361237
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                }
            };
            contentData = {
                ccdReferenceNumber: '1234-1235-1236-1237',
            };
            testWrapper = new TestWrapper('Documents');
        });

        afterEach(async () => {
            await testWrapper.destroy();
        });

        describe('Verify Content, Errors and Redirection', () => {
            testCommonContent.runTest('Documents', null, null, [], false, {
                ccdCase: {state: 'CaseCreated'},
                declaration: {declarationCheckbox: 'true'},
                payment: {total: 0}
            });

            describe('Probate Journey', () => {
                it('test correct content loaded on the page, no codicils, no alias, single executor', (done) => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, no alias, multiple executors', (done) => {
                    sessionData.executors = {
                        list: [
                            {isApplying: true, isApplicant: true},
                            {isApplying: true}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, no alias, multiple executors', (done) => {
                    sessionData.executors = {
                        list: [
                            {isApplying: true, isApplicant: true},
                            {isApplying: true}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, multiple executors, no alias, with optionRenunciated', (done) => {
                    sessionData.executors = {
                        executorsNumber: 2,
                        list: [
                            {isApplying: true, isApplicant: true},
                            {notApplyingKey: 'optionRenunciated'}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];
                            contentData.renunciationFormLink = config.links.renunciationForm;

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, has codicils, no alias, single executor', (done) => {
                    sessionData.will = {
                        codicils: 'optionYes',
                        codicilsNumber: '1'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-no-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];
                            contentData.codicilsNumber = 1;

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, has codicils, no alias, multiple executors', (done) => {
                    sessionData.will = {
                        codicils: 'optionYes',
                        codicilsNumber: '1'
                    };
                    sessionData.executors = {
                        list: [
                            {isApplying: true, isApplicant: true},
                            {isApplying: true}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-no-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];
                            contentData.codicilsNumber = 1;

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, single executor, no alias, specified registry address', (done) => {
                    sessionData.registry = {
                        address: '1 Red Street\nLondon\nO1 1OL'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel',
                                'address'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, single executor, no alias, online IHT', (done) => {
                    sessionData.iht = {
                        method: 'optionOnline'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, single executor, no alias, paper IHT, 207 or 400', (done) => {
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT207'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, single executor, no alias, paper IHT, 205', (done) => {
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT205'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, one executor name changed by deed poll', (done) => {
                    sessionData.executors = {
                        list: [
                            {
                                firstName: 'james',
                                lastName: 'miller',
                                isApplying: true,
                                isApplicant: true,
                                alias: 'jimbo fisher',
                                aliasReason: 'optionMarriage'
                            },
                            {
                                fullName: 'ed brown',
                                isApplying: true,
                                currentName: 'eddie jones',
                                currentNameReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'bob brown',
                                isApplying: true,
                                currentName: 'bobbie houston',
                                currentNameReason: 'optionDivorce'
                            }
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];
                            contentData.executorCurrentName = 'eddie jones';

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, multiple executor name changed by deed poll', (done) => {
                    sessionData.executors = {
                        list: [
                            {
                                firstName: 'james',
                                lastName: 'miller',
                                isApplying: true,
                                isApplicant: true,
                                alias: 'jimbo fisher',
                                aliasReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'ed brown',
                                isApplying: true,
                                currentName: 'eddie jones',
                                currentNameReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'bob brown',
                                isApplying: true,
                                currentName: 'bobbie houston',
                                currentNameReason: 'optionOther',
                                otherReason: 'Did not like my name'
                            }
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];
                            contentData.executorCurrentName = [
                                'jimbo fisher',
                                'eddie jones'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });
            });

            describe('Intestacy Journey', () => {
                it('test correct content loaded on the page', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionMarried'
                    };
                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT205'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'text3',
                                'text4',
                                'checklist-item1-codicils',
                                'checklist-item1-no-codicils',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });
            });

            describe('Common', () => {
                it('test correct content loaded on the page, original will uploaded', (done) => {
                    sessionData.documents = {
                        uploads: [
                            {
                                filename: 'death-certificate.pdf',
                                url: 'http://localhost:8383/documents/60e34ae2-8816-48a6-8b74-a1a3639cd505'
                            }
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item3-will-uploaded',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, original will not uploaded', (done) => {
                    sessionData.documents = {
                        uploads: []
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item3-will-uploaded',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, CCD Case ID not present', (done) => {
                    delete sessionData.ccdCase;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContentNotPresent(done, contentData);
                        });
                });

                it('test correct content loaded on the page, CCD Case ID is present', (done) => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item1-codicils',
                                'checklist-item2-spouse-renouncing',
                                'checklist-item4-iht205',
                                'checklist-item5-renunciated',
                                'checklist-item6-deed-poll',
                                'checkboxLabel-codicils',
                                'checkboxLabel'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it(`test it redirects to next page: ${expectedNextUrlForThankYouPage}`, (done) => {
                    contentData.sentDocuments = true;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testRedirect(done, contentData, expectedNextUrlForThankYouPage);
                        });
                });
            });
        });
    });

    describe('documents_new_death_cert_flow', () => {
        let testWrapper;
        const expectedNextUrlForThankYouPage = ThankYou.getUrl();
        let sessionData;
        let contentData;
        const ftValue = {ft_new_deathcert_flow: true};

        beforeEach((done) => {
            sessionData = {
                caseType: caseTypes.GOP,
                ccdCase: {
                    state: 'CaseCreated',
                    id: 1234123512361237
                },
                declaration: {
                    declarationCheckbox: 'true'
                },
                payment: {
                    total: 0
                },
            };
            contentData = {
                ccdReferenceNumber: '1234-1235-1236-1237',
            };
            testWrapper = new TestWrapper('Documents');

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(ftValue)
                .end(done);

            if (!testWrapper.pageToTest.resourcePath.includes('new_death_cert_flow')) {
                testWrapper.content_en = require(`app/resources/en/translation/${testWrapper.pageToTest.resourcePath}_new_death_cert_flow`);
                testWrapper.content_cy = require(`app/resources/cy/translation/${testWrapper.pageToTest.resourcePath}_new_death_cert_flow`);
            }
        });

        afterEach(() => {
            testWrapper.destroy();
        });

        describe('Verify Content, Errors and Redirection', () => {
            testCommonContent.runTest('Documents', null, null, [], false, {
                ccdCase: {state: 'CaseCreated'},
                declaration: {declarationCheckbox: 'true'},
                payment: {total: 0}
            });

            describe('Probate Journey', () => {
                it('test correct content loaded on the page no foreign death cert, single executor', (done) => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page codicils, no foreign death cert, single executor', (done) => {
                    sessionData.will = {
                        codicils: 'optionYes',
                        codicilsNumber: '1'
                    };
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, multiple executors', (done) => {
                    sessionData.executors = {
                        list: [
                            {isApplying: true, isApplicant: true},
                            {isApplying: true}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, multiple executors, with optionRenunciated', (done) => {
                    sessionData.executors = {
                        executorsNumber: 2,
                        list: [
                            {isApplying: true, isApplicant: true},
                            {notApplyingKey: 'optionRenunciated'}
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item9-deed-poll'
                            ];
                            contentData.renunciationFormLink = config.links.renunciationForm;

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, single executor, no alias, specified registry address', (done) => {
                    sessionData.registry = {
                        address: '1 Red Street\nLondon\nO1 1OL'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll',
                                'address'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, single executor, no alias, online IHT', (done) => {
                    sessionData.iht = {
                        method: 'optionOnline'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, single executor, no alias, paper IHT, 207 or 400', (done) => {
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT207'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, no codicils, single executor, no alias, paper IHT, 205', (done) => {
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT205'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, one executor name changed by deed poll', (done) => {
                    sessionData.executors = {
                        list: [
                            {
                                firstName: 'james',
                                lastName: 'miller',
                                isApplying: true,
                                isApplicant: true,
                                alias: 'jimbo fisher',
                                aliasReason: 'optionMarriage'
                            },
                            {
                                fullName: 'ed brown',
                                isApplying: true,
                                currentName: 'eddie jones',
                                currentNameReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'bob brown',
                                isApplying: true,
                                currentName: 'bobbie houston',
                                currentNameReason: 'optionDivorce'
                            }
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated'
                            ];
                            contentData.executorCurrentName = 'eddie jones';

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page, multiple executor name changed by deed poll', (done) => {
                    sessionData.executors = {
                        list: [
                            {
                                firstName: 'james',
                                lastName: 'miller',
                                isApplying: true,
                                isApplicant: true,
                                alias: 'jimbo fisher',
                                aliasReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'ed brown',
                                isApplying: true,
                                currentName: 'eddie jones',
                                currentNameReason: 'optionDeedPoll'
                            },
                            {
                                fullName: 'bob brown',
                                isApplying: true,
                                currentName: 'bobbie houston',
                                currentNameReason: 'optionOther',
                                otherReason: 'Did not like my name'
                            }
                        ]
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated'
                            ];
                            contentData.executorCurrentName = [
                                'jimbo fisher',
                                'eddie jones'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page no foreign death cert, interim death cert, single executor', (done) => {
                    sessionData.deceased = {
                        diedEngOrWales: 'optionYes',
                        deathCertificate: 'optionInterimCertificate'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page english foreign death cert, single executor', (done) => {
                    sessionData.deceased = {
                        diedEngOrWales: 'optionNo'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page foreign death cert with separate translation, single executor', (done) => {
                    sessionData.deceased = {
                        diedEngOrWales: 'optionNo',
                        foreignDeathCertTranslation: 'optionNo'
                    };

                    contentData.applicationFormPA19 = config.links.applicationFormPA19;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page foreign death cert with no separate translation, single executor', (done) => {
                    sessionData.deceased = {
                        diedEngOrWales: 'optionNo',
                        foreignDeathCertTranslation: 'optionYes'
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });
            });

            describe('Intestacy Journey', () => {
                it('test correct content loaded on the page with spouse renouncing', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionMarried'
                    };
                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page with iht 205', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced'
                    };
                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.iht = {
                        method: 'optionPaper',
                        form: 'optionIHT205'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page with no foreign death cert, interim death cert', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced',
                        diedEngOrWales: 'optionYes',
                        deathCertificate: 'optionInterimCertificate'
                    };

                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-foreign-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page with english foreign death cert', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced',
                        diedEngOrWales: 'optionNo',
                    };

                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page with foreign death cert with separate translation', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced',
                        diedEngOrWales: 'optionNo',
                        foreignDeathCertTranslation: 'optionNo'
                    };

                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;
                    contentData.applicationFormPA19 = config.links.applicationFormPA19;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it('test correct content loaded on the page with foreign death cert without separate translation', (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced',
                        diedEngOrWales: 'optionNo',
                        foreignDeathCertTranslation: 'optionYes'
                    };

                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    contentData.renunciationFormLink = config.links.renunciationForm;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const contentToExclude = [
                                'checklist-item2-codicils',
                                'checklist-item2-no-codicils',
                                'checklist-item3-will-damage-codicils',
                                'checklist-item3-will-damage-no-codicils',
                                'checklist-item4-interim-death-cert',
                                'checklist-item4-foreign-death-cert-translation',
                                'checklist-item5-foreign-death-cert-PA19',
                                'checklist-item6-spouse-renouncing',
                                'checklist-item7-iht205',
                                'checklist-item8-renunciated',
                                'checklist-item9-deed-poll'
                            ];

                            testWrapper.testContent(done, contentData, contentToExclude);
                        });
                });

                it(`test redirects to ${expectedNextUrlForThankYouPage} if intestacy case with no documents required`, (done) => {
                    sessionData.deceased = {
                        maritalStatus: 'optionDivorced'
                    };
                    sessionData.applicant = {
                        relationshipToDeceased: 'optionChild'
                    };
                    sessionData.caseType = caseTypes.INTESTACY;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContentPresent(done, [expectedNextUrlForThankYouPage]);
                        });
                });
            });

            describe('Common', () => {
                it(`test it redirects to next page: ${expectedNextUrlForThankYouPage}`, (done) => {
                    contentData.sentDocuments = true;

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testRedirect(done, contentData, expectedNextUrlForThankYouPage);
                        });
                });
            });
        });
    });
});
