'use strict';

const {expect} = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');
const ProbatePdf = rewire('app/services/ProbatePdf');
const Pdf = require('app/services/Pdf');
const config = require('app/config').pdf;

describe('ProbatePdfService', () => {
    describe('post()', () => {
        it('should call super.post()', (done) => {
            const endpoint = 'http://localhost';
            const pdfTemplate = config.template.coverSheet;
            const body = {};
            const ctx = {
                sessionID: 'sessionID',
                authToken: 'authToken',
                session: {
                    serviceAuthorization: 'serviceAuthorization'
                }
            };

            const headers = {
                'Content-Type': 'application/businessdocument+json',
                'Session-Id': ctx.sessionID,
                'Authorization': ctx.authToken,
                'ServiceAuthorization': ctx.session.serviceAuthorization
            };

            const logMessage = 'Post probate pdf';
            const probatePdf = new ProbatePdf(endpoint, 'abc123');
            const postStub = sinon.stub(Pdf.prototype, 'post');

            probatePdf.post(pdfTemplate, body, logMessage, ctx);

            expect(postStub.calledOnce).to.equal(true);
            expect(postStub.calledWith(
                body,
                logMessage,
                headers,
                `${endpoint}${config.path}/${pdfTemplate}`
            )).to.equal(true);

            postStub.restore();
            done();
        });
    });
});
