const UIStepRunner = require('app/core/runners/UIStepRunner');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const DetectDataChange = require('app/wrappers/DetectDataChange');
chai.use(sinonChai);
const co = require('co');

describe('UIStepRunner', () => {
    const req = {
        session: {
            language: 'en',
            form: {
                declaration: {
                    declarationCheckbox: 'true'
                }
            },
            back: ['hello']
        }
    };
    const req400 = {
        session: {
            language: 'en',
            form: {
                caseType: 'gop',
                ccdCase: {
                    id: 1234567890123456,
                    state: 'Pending'
                }
            },
            caseType: 'gop'
        },
        body: {
            addressLine1: '143 Caerfai Bay Road',
            postTown: 'town',
            newPostCode: 'L23 6WW',
            country: 'United Kingdon',
            postcode: 'L23 6WW'
        }
    };
    it('declarationCheckbox should be false where hasDataChanged is true', (done) => {
        const stepName = 'test';
        const step = {
            name: stepName,
            validate: () => [false, []],
            getContextData: () => '',
            nextStepUrl: () => '',
            action: () => [{}, req.session.form],
            constructor: {
                getUrl: () => 'hello'
            }
        };
        const hasDataChangedStub = sinon.stub(DetectDataChange.prototype, 'hasDataChanged').returns(true);
        const expectedForm = {
            declarationCheckbox: 'false',
            hasDataChanged: true
        };
        const res = {
            redirect: (url) => url
        };

        const runner = new UIStepRunner();
        co(function* () {
            yield runner.handlePost(step, req, res);
            expect(req.session.form.declaration).to.deep.equal(expectedForm);
            expect(req.session.form.eventDescription).equal('Page completed: hello');
            hasDataChangedStub.restore();
            done();
        });

    });
    it('On 400 error formSubmissionUnsuccessful is displayed in user journey', (done) => {
        const stepName = 'DeceasedAddress';
        const step = {
            name: stepName,
            validate: () => [true, []],
            getContextData: () => '',
            nextStepUrl: () => '',
            action: () => [{}, req400.session.form],
            constructor: {
                getUrl: () => 'hello'
            }
        };

        const hasDataChangedStub = sinon.stub(DetectDataChange.prototype, 'hasDataChanged').returns(true);
        const expectedForm = {
            declarationCheckbox: 'false',
            hasDataChanged: true
        };
        const res = {
            redirect: (url) => url
        };

        const runner = new UIStepRunner();
        co(function* () {
            yield runner.handlePost(step, req400, res);
            expect(req.session.form.declaration).to.deep.equal(expectedForm);
            expect(req.session.form.eventDescription).equal('Page completed: hello');
            hasDataChangedStub.restore();
            done();
        });
    });
});
