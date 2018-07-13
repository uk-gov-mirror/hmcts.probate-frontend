const TestWrapper = require('test/util/TestWrapper'),
    IhtCompleted = require('app/steps/ui/iht/completed/index');

describe('codicils-number', () => {
    let testWrapper;
    const expectedNextUrlForIhtComplete = IhtCompleted.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('CodicilsNumber');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it('test errors message displayed for invalid data', (done) => {
            const data = {codicilsNumber: 'abd'};

            testWrapper.testErrors(done, data, 'invalid', []);
        });

        it('test errors message displayed for invalid data - negative numbers', (done) => {
            const data = {codicilsNumber: '-1'};

            testWrapper.testErrors(done, data, 'invalid', []);
        });

        it('test errors message displayed for no number entered', (done) => {
            const data = {};

            testWrapper.testErrors(done, data, 'required', []);
        });

        it(`test it redirects to next page: ${expectedNextUrlForIhtComplete}`, (done) => {
            const data = {codicilsNumber: '1'};
            testWrapper.testRedirect(done, data, expectedNextUrlForIhtComplete);
        });
    });
});
