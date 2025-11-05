'use strict';

const {expect} = require('chai');
const normalizeNonIdamPages = require('app/utils/configNormalisers.js');

describe('normalizeNonIdamPages', () => {

    it('returns the array as-is when input is an array', () => {
        const arr = ['health/*', 'error'];
        const result = normalizeNonIdamPages(arr);
        expect(result).to.equal(arr);
    });

    it('parses a valid JSON array string', () => {
        const input = '["health/*","error","pin"]';
        const result = normalizeNonIdamPages(input);
        expect(result).to.deep.equal(['health/*', 'error', 'pin']);
    });

    it('returns [] for an empty string', () => {
        const result = normalizeNonIdamPages('');
        expect(result).to.deep.equal([]);
    });

    it('returns [] for a whitespace-only string', () => {
        const result = normalizeNonIdamPages('   ');
        expect(result).to.deep.equal([]);
    });

    it('returns [] for undefined', () => {
        // eslint-disable-next-line no-undefined
        const result = normalizeNonIdamPages(undefined);
        expect(result).to.deep.equal([]);
    });

    it('returns [] and warns when JSON is invalid', () => {
        const input = '[\'health/*\',\'error\']';
        const result = normalizeNonIdamPages(input);
        expect(result).to.deep.equal([]);
    });

    it('returns [] and warns when JSON parses but is not an array (object)', () => {
        const input = '{"a":1}';
        const result = normalizeNonIdamPages(input);
        expect(result).to.deep.equal([]);
    });

    it('returns [] and warns when JSON parses but is not an array (string)', () => {
        const input = '"health/*,error"';
        const result = normalizeNonIdamPages(input);
        expect(result).to.deep.equal([]);
    });

    it('returns [] for non-string primitives (numbers/booleans)', () => {
        expect(normalizeNonIdamPages(42)).to.deep.equal([]);
        expect(normalizeNonIdamPages(true)).to.deep.equal([]);
    });
});
