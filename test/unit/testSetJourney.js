'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const setJourney = rewire('app/middleware/setJourney');

describe('setJourney', () => {
    describe('isIntestacyJourney()', () => {
        it('should return false if session.willLeft and session.form.will.left are not set', (done) => {
            const session = {};
            const isIntestacyJourney = setJourney.isIntestacyJourney(session);
            expect(isIntestacyJourney).to.equal(false);
            done();
        });

        it('should return false if session.caseType is set to \'gop\'', (done) => {
            const session = {
                caseType: 'gop'
            };
            const isIntestacyJourney = setJourney.isIntestacyJourney(session);
            expect(isIntestacyJourney).to.equal(false);
            done();
        });

        it('should return false if session.form.will.left is set to \'Yes\'', (done) => {
            const session = {
                form: {
                    will: {
                        left: 'Yes'
                    }
                }
            };
            const isIntestacyJourney = setJourney.isIntestacyJourney(session);
            expect(isIntestacyJourney).to.equal(false);
            done();
        });

        it('should return true if session.caseType is set to \'intestacy\'', (done) => {
            const session = {
                caseType: 'intestacy'
            };
            const isIntestacyJourney = setJourney.isIntestacyJourney(session);
            expect(isIntestacyJourney).to.equal(true);
            done();
        });

        it('should return true if session.form.will.left is set to \'No\'', (done) => {
            const session = {
                form: {
                    will: {
                        left: 'No'
                    }
                }
            };
            const isIntestacyJourney = setJourney.isIntestacyJourney(session);
            expect(isIntestacyJourney).to.equal(true);
            done();
        });
    });

    describe('setWillLeftFormdata()', () => {
        it('should return the original session if session.caseType does not exist', (done) => {
            const sessionToTest = {
                form: {}
            };
            const session = setJourney.setWillLeftFormdata(sessionToTest);
            expect(session).to.deep.equal({
                form: {}
            });
            done();
        });

        it('should add session.caseType to the form data if session.caseType exists and session.form.will does not exist', (done) => {
            const sessionToTest = {
                form: {},
                caseType: 'probate'
            };
            const session = setJourney.setWillLeftFormdata(sessionToTest);
            expect(session).to.deep.equal({
                form: {
                    will: {
                        left: 'Yes'
                    }
                },
                caseType: 'probate'
            });
            done();
        });

        it('should add session.caseType to the form data if session.caseType exists and session.form.will.left does not exist', (done) => {
            const sessionToTest = {
                form: {
                    will: {}
                },
                caseType: 'probate'
            };
            const session = setJourney.setWillLeftFormdata(sessionToTest);
            expect(session).to.deep.equal({
                form: {
                    will: {
                        left: 'Yes'
                    }
                },
                caseType: 'probate'
            });
            done();
        });

        it('should not add session.caseType to the form data if session.caseType exists and session.form.will.left exists', (done) => {
            const sessionToTest = {
                form: {
                    will: {
                        left: 'Yes'
                    }
                },
                caseType: 'probate'
            };
            const session = setJourney.setWillLeftFormdata(sessionToTest);
            expect(session).to.deep.equal({
                form: {
                    will: {
                        left: 'Yes'
                    }
                },
                caseType: 'probate'
            });
            done();
        });
    });

    describe('setJourney()', () => {
        it('should set req.session with the probate journey when isIntestacyJourney is false', (done) => {
            const revert = setJourney.__set__('probateJourney', {journey: 'probate'});
            const req = {
                session: {
                    form: {}
                }
            };
            const res = {};
            const next = sinon.spy();

            setJourney(req, res, next);

            expect(req.session).to.deep.equal({
                form: {},
                journey: {
                    journey: 'probate'
                }
            });
            expect(next.calledOnce).to.equal(true);

            revert();
            done();
        });

        it('should set req.session with the intestacy journey when isIntestacyJourney is true', (done) => {
            const revert = setJourney.__set__('intestacyJourney', {journey: 'intestacy'});
            const req = {
                session: {
                    form: {},
                    caseType: 'intestacy'
                }
            };
            const res = {};
            const next = sinon.spy();

            setJourney(req, res, next);

            expect(req.session).to.deep.equal({
                form: {
                    will: {
                        left: 'No'
                    }
                },
                caseType: 'intestacy',
                journey: {
                    journey: 'intestacy'
                }
            });
            expect(next.calledOnce).to.equal(true);

            revert();
            done();
        });
    });

    describe('getJourneyName()', () => {
        it('should return \'gop\' if session.caseType and session.form.will.left are not set', (done) => {
            const session = {};
            const journeyName = setJourney.getJourneyName(session);
            expect(journeyName).to.equal('gop');
            done();
        });

        it('should return \'gop\' as journey name if session.caseType is set to \'gop\'', (done) => {
            const session = {
                caseType: 'probate'
            };
            const journeyName = setJourney.getJourneyName(session);
            expect(journeyName).to.equal('probate');
            done();
        });

        it('should return \'gop\' as journey name if session.form.will.left is set to \'Yes\'', (done) => {
            const session = {
                form: {
                    will: {
                        left: 'Yes'
                    }
                }
            };
            const journeyName = setJourney.getJourneyName(session);
            expect(journeyName).to.equal('gop');
            done();
        });

        it('should return \'intestacy\' if session.caseType is set to \'intestacy\'', (done) => {
            const session = {
                caseType: 'intestacy'
            };
            const journeyName = setJourney.getJourneyName(session);
            expect(journeyName).to.equal('intestacy');
            done();
        });

        it('should return \'intestacy\' if session.form.will.left is set to \'No\'', (done) => {
            const session = {
                form: {
                    will: {
                        left: 'No'
                    }
                }
            };
            const journeyName = setJourney.getJourneyName(session);
            expect(journeyName).to.equal('intestacy');
            done();
        });
    });
});
