'use strict';

const initSteps = require('app/core/initSteps');
const {assert} = require('chai');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const ProvideInformation = steps.ProvideInformation;

describe('ProvideInformation', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = ProvideInformation.constructor.getUrl();
            expect(url).to.equal('/provide-information');
            done();
        });
    });
    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = ProvideInformation.nextStepOptions();
            expect(result).to.deep.equal({
                options: [
                    {key: 'isUploadingDocument', value: 'true', choice: 'isUploadingDocument'}
                ]
            });
            done();
        });
    });
    describe('isComplete()', () => {
        it('should return the complete when documents uploaded', (done) => {
            const formdata = {
                documentupload: ['screenshot1.png', 'screenshot2.png']
            };
            const result = ProvideInformation.isComplete(formdata);
            const expectedTrue = [true, 'inProgress'];
            expect(result).to.deep.equal(expectedTrue);
            done();
        });
        it('should return complete false when no documents uploaded', (done) => {
            const formdata = {
            };
            const result = ProvideInformation.isComplete(formdata);
            const expectedFalse = [false, 'inProgress'];
            expect(result).to.deep.equal(expectedFalse);
            done();
        });
        it('should return complete true when documents have uploads', (done) => {
            const formdata = {
                documents: {uploads: [{filename: 'screenshot1.png'}, {filename: 'screenshot2.png'}]}
            };
            const result = ProvideInformation.isComplete(formdata);
            const expectedFalse = [true, 'inProgress'];
            expect(result).to.deep.equal(expectedFalse);
            done();
        });
    });

    describe('action()', () => {
        it('test it cleans up context', () => {
            const ctx = {
                uploadedDocuments: ['screenshot1.png', 'screenshot2.png'],
                isUploadingDocument: true
            };
            const formdata = {
                uploadedDocuments: ['screenshot1.png', 'screenshot2.png'],
                isUploadingDocument: true
            };

            ProvideInformation.action(ctx, formdata);
            assert.isUndefined(ctx.uploadedDocuments);
            assert.isUndefined(ctx.isUploadingDocument);
        });
    });

    describe('getContextData()', () => {
        it('should return the context with uploaded documents', (done) => {
            const req = {
                session: {
                    form: {
                        documents: {
                            uploads: [{filename: 'screenshot1.png'}, {filename: 'screenshot2.png'}]
                        },
                        body: {
                            isUploadingDocument: true
                        }
                    }
                },
            };

            const ctx = ProvideInformation.getContextData(req);
            expect(ctx.uploadedDocuments).to.deep.equal(['screenshot1.png', 'screenshot2.png']);
            done();
        });
    });

    describe('handlePost()', () => {
        it('should return the context with errors', (done) => {
            const ctx = {};
            const errors = [];
            const formdata = {
                documents: {
                    error: 'file'
                }
            };
            const session = {language: 'en'};
            ProvideInformation.handlePost(ctx, errors, formdata, session);
            // eslint-disable-next-line no-undefined
            expect(errors).to.deep
                .equal([{field: 'file', href: '#file', msg: 'provideinformation.errors.file.file'}]);
            done();
        });
    });
});
