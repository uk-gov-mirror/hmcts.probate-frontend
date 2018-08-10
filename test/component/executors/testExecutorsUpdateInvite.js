const TestWrapper = require('test/util/TestWrapper');
const services = require('app/components/services');
const sinon = require('sinon');
const when = require('when');
const {assert} = require('chai');
const ExecutorsUpdateInviteSent = require('app/steps/ui/executors/updateinvitesent/index');

describe('executors-update-invite', () => {
    let testWrapper;
    let resendInvitesStub;
    const sessionData = require('test/data/executors-invites');
    const expectedNextUrlForExecutorsUpdateInviteSent = ExecutorsUpdateInviteSent.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorsUpdateInvite');
        resendInvitesStub = sinon.stub(services, 'resendInvite');
    });

    afterEach(() => {
        testWrapper.destroy();
        resendInvitesStub.restore();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test correct content loaded on the page when only 1 other executor has had their email changed', (done) => {
            sessionData.executors.list[1].emailChanged = true;
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, ['header-multiple']);
                });
        });

        it('test correct content loaded on the page when more than 1 other executor has had their email changed', (done) => {
            sessionData.executors.list[2].isApplying = true;
            sessionData.executors.list[2].emailChanged = true;
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, ['header']);
                });
        });

        it('test content displays only the executors who have had their emails changed', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            assert(response.text.includes('Andrew Wiles'));
                            assert(response.text.includes('Leonhard Euler'));
                            assert(!response.text.includes('Pierre de Fermat'));
                            done();
                        });
                });
        });

        it('test content displays only the single executor who has had their email changed', (done) => {
            delete sessionData.executors.list[2].emailChanged;
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            assert(response.text.includes('Andrew Wiles'));
                            assert(!response.text.includes('Leonhard Euler'));
                            assert(!response.text.includes('Pierre de Fermat'));
                            done();
                        });
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForExecutorsUpdateInviteSent}`, (done) => {
            resendInvitesStub.returns(when(Promise.resolve({response: 'Make it pass!'})));
            const data = {};
            testWrapper.testRedirect(done, data, expectedNextUrlForExecutorsUpdateInviteSent);
        });
    });
});
