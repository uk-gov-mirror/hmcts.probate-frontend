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
            userLoggedIn: true,
            language: 'en',
            regId: 'regid123',
            form: {
                caseType: 'gop',
                ccdCase: {
                    id: 1234567890123456,
                    state: 'Pending'
                }
            },
            back: ['hello']
        },
        log: {
            error: sinon.spy()
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
        const generateContent = {
            'title': 'Copies - UK',
            'question': 'How many extra official copies of the grant do you need for use in the UK?',
            'paragraph1': 'You&rsquo;ll receive a free official copy of a grant of probate with your application fee.',
            'paragraph2': 'Order extra official copies of the grant if you need to send them to different asset holders, for example, a copy for banks, insurance policies, shares and property.',
            'paragraph3': 'Extra official copies cost &pound;1.50 each',
            'copies': 'Number of extra official copies',
            'questionOld': 'How many extra official copies of the grant do you need for use in the UK?',
            'paragraph1Old': 'You&rsquo;ll receive a free official copy of a grant of probate with your application fee.',
            'paragraph2Old': 'Order extra official copies of the grant if you need to send them to different asset holders, for example, a copy for banks, insurance policies, shares and property.',
            'paragraph3Old': 'Extra official copies cost &pound;1.50 each',
            'copiesOld': 'Number of extra official copies',
            'detailTitle': 'What is an official copy?',
            'detailText1': 'It&rsquo;s a copy of the grant with a holographic silver seal on the front of it. A bank may ask you for a certified copy to release funds to you.',
            'detailText2': 'Official copies are used for assets in the UK only.',
            'errors': 'key \'copies.uk.errors (en)\' returned an object instead of string.'
        };
        const generateFields = {
            'uk': {
                'value': '2',
                'error': false
            },
            'overseas': {
                'value': '0',
                'error': false
            },
            'language': {
                'value': 'en',
                'error': false
            },
            'isAvayaWebChatEnabled': {
                'value': 'true',
                'error': false
            },
            'isWebChatEnabled': {
                'value': 'true',
                'error': false
            },
            'isGaEnabled': {
                'value': 'true',
                'error': false
            }
        };
        const commonContent = {
            'uk': 2,
            'overseas': 0,
            'language': 'en',
            'isAvayaWebChatEnabled': true,
            'isWebChatEnabled': true,
            'isGaEnabled': true
        };
        const step = {
            name: stepName,
            template: 'ui/copies/uk/template',
            validate: () => [false, []],
            getContextData: () => '',
            nextStepUrl: () => '',
            action: () => [{}, req400.session.form],
            constructor: {
                getUrl: () => 'hello'
            },
            shouldPersistFormData: () => true,
            persistFormData: () => ({name: 'Error', message: 'xxxxxxx'}),
            generateContent: () => (generateContent),
            generateFields: () => (generateFields),
            commonContent: () => (commonContent),
        };

        const expectedForm = {
            id: 1234567890123456,
        };
        const res = {
            redirect: (url) => url,
        };
        const runner = new UIStepRunner();
        co(function* () {
            yield runner.handlePost(step, req400, res);
            expect(res.statusCode).to.equal(400);
            expect(res).to.have.property('body');
            expect(res.body).to.equal('wrong header');
            expect(req.session.form.ccdCase.id).to.deep.equal(expectedForm);
            expect(req.session.form.eventDescription).equal('Page completed: hello');
            done();
        });
    });
});
