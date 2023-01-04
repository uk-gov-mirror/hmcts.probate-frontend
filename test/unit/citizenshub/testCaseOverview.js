'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const rewire = require('rewire');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const CitizensHub = rewire('app/steps/ui/citizenshub');
const i18next = require('i18next');

describe('CitizensHub', () => {
    let section;
    let templatePath;
    let schema;

    beforeEach(() => {
        section = 'paymentStatus';
        templatePath = 'payment/status';
        schema = {
            $schema: 'http://json-schema.org/draft-07/schema',
            properties: {}
        };
    });

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);

            const url = citizensHub.constructor.getUrl();
            expect(url).to.equal('/citizens-hub');
            done();
        });
    });

    describe('getContextData() with Reference Number', () => {
        let ctx;
        let req;

        it('should return the context with the ccd case id', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'CaseCreated'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.ccdReferenceNumber).to.deep.equal('1234-5678-9012-3456');
            expect(ctx.ccdReferenceNumberAccessible).to.deep.equal('1 2 3 4, -, 5 6 7 8, -, 9 0 1 2, -, 3 4 5 6');
            done();
        });
    });

    describe('getContextData()', () => {
        let ctx;
        let req;

        it('should return the context with the Deceased Name', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'CaseCreated'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.deceasedName).to.deep.equal('Peter Williams');
            done();
        });
        it('should return the context with case progress for CaseCreated', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'CaseCreated'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(false);
            expect(ctx.applicationInReview).to.equal(false);
            expect(ctx.grantIssued).to.equal(false);
            done();
        });
        it('should return the context with case progress for CasePrinted', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'CasePrinted'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(false);
            expect(ctx.applicationInReview).to.equal(false);
            expect(ctx.grantIssued).to.equal(false);
            done();
        });
        it('should return the context with case progress for BOReadyForExamination', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'BOReadyForExamination'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(true);
            expect(ctx.applicationInReview).to.equal(false);
            expect(ctx.grantIssued).to.equal(false);
            done();
        });
        it('should return the context with case progress for BOExamining', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'BOExamining'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(true);
            expect(ctx.applicationInReview).to.equal(true);
            expect(ctx.grantIssued).to.equal(false);
            done();
        });
        it('should return the context with case progress for BOGrantIssued', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'BOGrantIssued'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(true);
            expect(ctx.applicationInReview).to.equal(true);
            expect(ctx.grantIssued).to.equal(true);
            done();
        });
        it('should return the context with case progress for BOCaseStopped', (done) => {
            req = {
                session: {
                    form: {
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'BOCaseStopped'
                        },
                        deceased: {
                            firstName: 'Peter',
                            lastName: 'Williams'
                        }
                    }
                }
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            ctx = citizensHub.getContextData(req);
            expect(ctx.documentsReceived).to.equal(true);
            expect(ctx.applicationInReview).to.equal(true);
            expect(ctx.grantIssued).to.equal(false);
            done();
        });
    });
    describe('action()', () => {
        it('test that context variables are removed and empty object returned', () => {
            let formdata = {};
            let ctx = {
                ccdReferenceNumber: '1234-1235-1236-1237',
                ccdReferenceNumberAccessible: '1 2 3 4, -, 5 6 7 8, -, 9 0 1 2, -, 3 4 5 6'
            };
            const citizensHub = new CitizensHub(steps, section, templatePath, i18next, schema);
            [ctx, formdata] = citizensHub.action(ctx, formdata);
            expect(ctx).to.deep.equal({});
        });
    });
});
