const FormatName = require('app/utils/FormatName');
const chai = require('chai');
const expect = chai.expect;

describe('FormatName.js', () => {
    describe('format()', () => {
        it('should return a correctly formatted name when a person is given', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller'};
            expect(FormatName.format(executor)).to.equal('James Miller');
            done();
        });

        it('should return a first name without trailing spaces when only a first name is given', (done) => {
            const executor = {firstName: 'James'};
            expect(FormatName.format(executor)).to.equal('James');
            done();
        });

        it('should return a last name without leading spaces when only a last name is given', (done) => {
            const executor = {lastName: 'Miller'};
            expect(FormatName.format(executor)).to.equal('Miller');
            done();
        });

        it('should return an empty string when a person is not given', (done) => {
            expect(FormatName.format()).to.equal('');
            done();
        });
    });

    describe('currentName()', () => {
        it('should return applicant alias when the person does have an alias', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller', alias: 'Bob Alias'};
            expect(FormatName.currentName(executor)).to.equal('Bob Alias');
            done();
        });

        it('should return a correctly formatted name when the person does not have an alias', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller'};
            expect(FormatName.currentName(executor)).to.equal('James Miller');
            done();
        });

        it('should return an empty string when a person is not given', (done) => {
            expect(FormatName.currentName()).to.equal('');
            done();
        });
    });

    describe('aliasReason()', () => {
        it('should return correctly formatted alias reason when reason is Marriage', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller', alias: 'Bob Alias', aliasReason: 'Marriage'};
            expect(FormatName.aliasReason(executor)).to.equal('got married');
            done();
        });

        it('should return correctly formatted alias reason when reason is Divorce', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller', aliasReason: 'Divorce'};
            expect(FormatName.aliasReason(executor)).to.equal('got divorced');
            done();
        });

        it('should return correctly formatted alias reason when reason is Change by deed poll', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller', aliasReason: 'Change by deed poll'};
            expect(FormatName.aliasReason(executor)).to.equal('changed their name by deed poll');
            done();
        });

        it('should return correctly formatted other reason when reason is other', (done) => {
            const executor = {
                firstName: 'James',
                lastName: 'Miller',
                aliasReason: 'other',
                otherReason: 'because I felt like it'
            };
            expect(FormatName.aliasReason(executor)).to.equal(': because I felt like it');
            done();
        });

        it('should return an empty string when no reason is passed', (done) => {
            const executor = {firstName: 'James', lastName: 'Miller'};
            expect(FormatName.aliasReason(executor)).to.equal('');
            done();
        });
    });

    describe('formatAliasReason()', () => {
        it('should return the correct text when Marriage is selected as aliasReason', (done) => {
            const aliasReason = 'Marriage';
            expect(FormatName.formatAliasReason(aliasReason)).to.equal('got married');
            done();
        });

        it('should return the correct text when Divorce is selected as aliasReason', (done) => {
            const aliasReason = 'Divorce';
            expect(FormatName.formatAliasReason(aliasReason)).to.equal('got divorced');
            done();
        });

        it('should return the correct text when Changed by deed poll is selected as aliasReason', (done) => {
            const aliasReason = 'Change by deed poll';
            expect(FormatName.formatAliasReason(aliasReason)).to.equal('changed their name by deed poll');
            done();
        });

        it('should return the other reason when other is selected as aliasReason', (done) => {
            const aliasReason = 'other';
            const otherReason = 'because I felt like it';
            expect(FormatName.formatAliasReason(aliasReason, otherReason)).to.equal(': because I felt like it');
            done();
        });
    });
});
