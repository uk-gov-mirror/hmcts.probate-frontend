'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const {get} = require('lodash');
const config = require('config');

class ReviewResponse extends ValidationStep {

    static getUrl() {
        return '/review-response';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        if (formdata.documents?.uploads) {
            ctx.uploadedDocuments = formdata.documents.uploads.map(doc => doc.filename);
        }
        return ctx;
    }

    handlePost(ctx, errors, formdata, session, req) {
        const error = formdata.documents?.error;
        if (error) {
            errors = errors || [];
            errors.push(FieldError('file', error, this.resourcePath, this.generateContent({}, {}, session.language), session.language));
            delete formdata.documents.error;
        }
        if (error === null) {
            const document = new Document(config.services.orchestrator.url, ctx.sessionID);
            document.notifyApplicant(ctx.ccdCase.id, req.authToken, req.session.serviceAuthorization)
                .then(result => {
                    if (result.name === 'Error') {
                        throw new ReferenceError('Error sending notification about doc upload');
                    }
                });
        }
        return [ctx, errors];
    }

    isComplete(ctx, formdata) {
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
        super.action(ctx, formdata);
        delete ctx.uploadedDocuments;
        delete ctx.isUploadingDocument;
        return [ctx, formdata];
    }
}

module.exports = ReviewResponse;
