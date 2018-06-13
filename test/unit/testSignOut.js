const initSteps = require('app/core/initSteps');
const assert = require('chai').assert;
const sinon = require('sinon');
const when = require('when');
const co = require('co');
const services = require('app/components/services');

describe('Sign-Out', function () {

    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);

    it('test authToken, cookies and session data have been removed from the session', () => {
        const signOut = steps.SignOut;
        const signOutStub = sinon.stub(services, 'signOut');
        signOutStub.returns(when(200));

        const req = {
            cookies: {
                _ga: 'dummy_ga',
                _gid: 'dummy_gid',
                _gat: '1'
            },
            session: {
                form: {
                    payloadVersion: '4.1.0',
                    applicantEmail: 'test@email.com'
                },
                destroy: () => {
                    delete this.session;
                }
            },
        };

        co(function* () {
            yield signOut.getContextData(req);
            assert.isNull(req.cookies);
            assert.isNull(req.session);
        });
    });
});
