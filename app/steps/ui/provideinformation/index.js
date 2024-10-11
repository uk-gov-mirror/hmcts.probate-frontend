'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const {get} = require('lodash');

class ProvideInformation extends ValidationStep {

    static getUrl() {
        return '/provide-information';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        if (formdata.documents && formdata.documents.uploads) {
            ctx.uploadedDocuments = formdata.documents.uploads.map(doc => doc.filename);
        }
        ctx.isUploadingDocument = req.body && req.body.isUploadingDocument;
        console.log('uploadfiles-->getContextData');
        console.log('uploadfiles-->getContextData-->'+ctx.isUploadingDocument);
        return ctx;
    }

    handlePost(ctx, errors, formdata, session) {
        const error = formdata.documents && formdata.documents.error;
        if (error) {
            errors = errors || [];
            errors.push(FieldError('file', error, this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            delete formdata.documents.error;
        }
        console.log('uploadfiles-->handlePost');
        return [ctx, errors];
    }

    isComplete(ctx, formdata) {
        console.log('uploadfiles-->isComplete');
        console.log('uploadfiles-->isComplete' + get(formdata, 'documentupload'));
        console.log('uploadfiles-->isComplete' + get(formdata, 'documents.uploads'));
        return [(typeof get(formdata, 'documentupload') !== 'undefined' || typeof get(formdata, 'documents.uploads') !== 'undefined'), 'inProgress'];
    }

    nextStepOptions() {
        console.log('uploadfiles-->nextStepOptions');
        return {
            options: [
                {key: 'isUploadingDocument', value: 'true', choice: 'isUploadingDocument'}
            ]
        };
    }

    action(ctx, formdata) {
        console.log('uploadfiles-->action');
        super.action(ctx, formdata);
        delete ctx.uploadedDocuments;
        delete ctx.isUploadingDocument;
        return [ctx, formdata];
    }
}

module.exports = ProvideInformation;
