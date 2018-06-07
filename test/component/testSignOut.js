const TestWrapper = require('test/util/TestWrapper');
const config = require('app/config');

describe.only('sign-out', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('SignOut');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test right content loaded on the page', (done) => {
            const excludeKeys = [];
            const contentData = {
                idamLoginLink: config.services.idam.loginUrl
            };

            testWrapper.testContent(done, excludeKeys, contentData);
        });
    });
});
