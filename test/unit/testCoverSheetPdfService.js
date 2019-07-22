'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const ProbateCoverSheetPdf = require('app/services/CoverSheetPdf');
const ProbatePdf = require('app/services/Pdf');
const config = require('app/config').pdf;

describe('CoverSheetPdfService', () => {
    describe('post()', () => {
        it('should call super.post()', (done) => {
            const endpoint = 'http://localhost';
            const req = {
                session: {
                    formdata: {
                        applicant: {
                            address: '1 Red Road, London, L1 1LL'
                        },
                        ccdCase: {
                            id: 'ccd123'
                        },
                        registry: {
                            address: 'Digital Application, Oxford District Probate Registry, Combined Court Building, St Aldates, Oxford, OX1 1LY'
                        }
                    }
                }
            };
            const probateCoverSheetPdf = new ProbateCoverSheetPdf(endpoint, 'abc123');
            const postStub = sinon.stub(ProbatePdf.prototype, 'post');

            probateCoverSheetPdf.post(req);

            expect(postStub.calledOnce).to.equal(true);
            expect(postStub.calledWith(
                config.template.coverSheet,
                {
                    applicantAddress: '1 Red Road, London, L1 1LL',
                    caseReference: 'ccd123',
                    submitAddress: 'Digital Application, Oxford District Probate Registry, Combined Court Building, St Aldates, Oxford, OX1 1LY'
                },
                'Post probate cover sheet pdf'
            )).to.equal(true);

            postStub.restore();
            done();
        });
    });
});
