'use strict';

const TestWrapper = require('test/util/TestWrapper');
const DeceasedAlias = require('app/steps/ui/deceased/alias/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');

describe('iht-value', () => {
    let testWrapper;
    const expectedNextUrlForDeceasedAlias = DeceasedAlias.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('IhtValue');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('IhtValue');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done, []);
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        it('test iht value schema validation when net value is greater than gross value', (done) => {
            const data = {
                grossValueOnline: 12345,
                netValueOnline: 123456
            };

            testWrapper.testErrors(done, data, 'netValueGreaterThanGross', ['netValueOnline']);
        });

        it(`test it redirects to Deceased Alias page: ${expectedNextUrlForDeceasedAlias}`, (done) => {
            const data = {
                grossValueOnline: 123456,
                netValueOnline: 12345
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForDeceasedAlias);
        });
    });
});
