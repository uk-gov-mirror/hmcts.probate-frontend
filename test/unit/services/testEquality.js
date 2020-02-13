'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const Equality = rewire('app/services/Equality');

describe('EqualityService', () => {
    describe('post()', () => {
        it('should call log() and fetchJson()', (done) => {
            const endpoint = 'http://localhost';
            const fetchOptions = {method: 'POST'};
            const data = {
                serviceId: 'PROBATE',
                ccdCaseId: 1234567890123456,
                returnUrl: 'http://localhost:3000/task-list',
                language: 'en'
            };
            const equality = new Equality(endpoint, 'abc123');
            const logSpy = sinon.spy(equality, 'log');
            const fetchJsonSpy = sinon.spy(equality, 'fetchJson');
            const fetchOptionsStub = sinon.stub(equality, 'fetchOptions').returns(fetchOptions);

            equality.post(data, endpoint);

            expect(equality.log.calledOnce).to.equal(true);
            expect(equality.log.calledWith('Post data to Equality and Diversity service')).to.equal(true);
            expect(equality.fetchJson.calledOnce).to.equal(true);
            expect(equality.fetchJson.calledWith(endpoint, fetchOptions)).to.equal(true);

            logSpy.restore();
            fetchJsonSpy.restore();
            fetchOptionsStub.restore();
            done();
        });
    });
});
