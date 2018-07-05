'use strict';
const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const assert = require('chai').assert;
const sinon = require('sinon');
const when = require('when');
const services = require('app/components/services');

describe('Sign-Out', function () {

    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
    const signOut = steps.SignOut;

    it('test authToken, cookies and session data have been removed from the session', (done) => {
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
                }
            },
        };

        req.session.destroy = sinon.spy();
        req.cookies = sinon.spy();

        signOut.getContextData(req).then(() => {
            assert.isUndefined(req.cookies);
            expect(req.session.destroy).to.have.been.calledOn(req.session);
            done();
        });
    });

    it('test correct url is returned from getUrl function', () => {
        assert.equal(signOut.constructor.getUrl(), '/sign-out');
    });
});
