const TestWrapper = require('test/util/TestWrapper');
const config = require('app/config');

describe('stop-page', () => {
    let testWrapper;

    beforeEach(() => {
        testWrapper = new TestWrapper('StopPage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test right content loaded on the page - no will', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('noWill');
            const excludeKeys = ['notOriginal', 'codicils', 'notExecutor', 'ihtNotCompleted', 'mentalCapacity', 'deathCertificate', 'notInEnglandOrWales', 'progress'];
            testWrapper.testContent(done, excludeKeys);
        });

        it('test right content loaded on the page - not original', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('notOriginal');
            const excludeKeys = ['noWill', 'codicils', 'notExecutor', 'ihtNotCompleted', 'mentalCapacity', 'deathCertificate', 'notInEnglandOrWales', 'progress'];
            testWrapper.testContent(done, excludeKeys);
        });

        it('test right content loaded on the page - codicils', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('codicils');
            const excludeKeys = ['noWill', 'notOriginal', 'notExecutor', 'ihtNotCompleted', 'mentalCapacity', 'deathCertificate', 'notInEnglandOrWales', 'progress'];
            testWrapper.testContent(done, excludeKeys);
        });

        it('test right content loaded on the page - not executor', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('notExecutor');
            const excludeKeys = ['noWill', 'notOriginal', 'codicils', 'ihtNotCompleted', 'mentalCapacity', 'deathCertificate', 'notInEnglandOrWales', 'progress'];
            testWrapper.testContent(done, excludeKeys);
        });

        it('test right content loaded on the page - deceased not in england or wales', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('notInEnglandOrWales');
            const excludeKeys = ['noWill', 'notOriginal', 'codicils', 'notExecutor', 'ihtNotCompleted', 'mentalCapacity', 'deathCertificate', 'progress'];
            testWrapper.testContent(done, excludeKeys);
        });

        it('test right content loaded on the page - iht not completed', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('ihtNotCompleted');
            const excludeKeys = ['noWill', 'notOriginal', 'codicils', 'notExecutor', 'mentalCapacity', 'deathCertificate', 'notInEnglandOrWales', 'progress'];
            testWrapper.testContent(done, excludeKeys, {ihtNotCompleted: config.links.ihtNotCompleted});
        });

        it('test right content loaded on the page - no death certificate', (done) => {
            testWrapper.pageUrl = testWrapper.pageToTest.constructor.getUrl('deathCertificate');
            const excludeKeys = ['noWill', 'notOriginal', 'codicils', 'notExecutor', 'ihtNotCompleted', 'mentalCapacity', 'notInEnglandOrWales', 'contactProbateOffice'];
            testWrapper.testContent(done, excludeKeys, {deathCertificate: config.links.deathCertificate});
        });
    });
});
