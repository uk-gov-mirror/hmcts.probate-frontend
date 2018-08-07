const TestWrapper = require('test/util/TestWrapper');
const WillOriginal = require('app/steps/ui/will/original/index');
const StopPage = require('app/steps/ui/stoppage/index');

describe('will-left', () => {
    let testWrapper;
    const expectedNextUrlForWillOriginal = WillOriginal.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('noWill');

    beforeEach(() => {
        testWrapper = new TestWrapper('WillLeft');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test right content loaded on the page', (done) => {
            const excludeKeys = [];
            const contentData = {
                he1lpTitle: 'D1o you need help?',
                contactTelNo: 'Phone: 0300 303 0648 (Monday to Friday 9am to 5pm)',
                helpEmailLabel: 'Email:',
                contactEmailAddress: 'oxforddprenquiries@hmcts.gsi.gov.uk'
            };

            testWrapper.testContent(done, excludeKeys, contentData);
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};

            testWrapper.testErrors(done, data, 'required', []);
        });

        it(`test it redirects to will original: ${expectedNextUrlForWillOriginal}`, (done) => {
            const data = {
                'left': 'Yes'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForWillOriginal);
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                'left': 'No'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
        });

    });
});
