'use strict';

const initSteps = require('app/core/initSteps');
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
});
