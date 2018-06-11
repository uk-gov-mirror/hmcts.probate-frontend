const initSteps = require('app/core/initSteps'),
    assert = require('chai').assert,
    {isNil} = require('lodash');

describe('Sign-Out', function () {

    const steps = initSteps([__dirname + '/../../app/steps/action/', __dirname + '/../../app/steps/ui']);

    it('test authToken, cookies and session data have been removed from the session', () => {
        const signOut = steps.SignOut;
        const req = {
            authToken: 'dummy_token',
            cookies: {
                _ga: 'dummy_ga',
                seen_cookie_message: 'yes',
                'Idea-9cb023e2': 'dummy_data',
                'connect.sid': 'dummy_sid',
                _gid: 'dummy_gid',
                _gat: '1'
            },
            session: {
                form: {
                    payloadVersion: '4.1.0',
                    applicantEmail: 'test@email.com'
                }
            }
        };

        signOut.getContextData(req);
        assert.isTrue(isNil(req.cookies));
        assert.isTrue(isNil(req.session));
    });

});
