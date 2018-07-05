'use strict';
const TestWrapper = require('test/util/TestWrapper');

describe('sign-out', () => {
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

            testWrapper.testContent(done, excludeKeys, {});
        });
    });
});
