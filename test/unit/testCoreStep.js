'use strict';

const coreStep = require('app/core/steps/Step');
const {expect} = require('chai');

describe('Step', () => {
    it('Should return req, res and ctx', (done) => {
        let req = {testReq: 'testReq'};
        let res = {testRes: 'testRes'};
        let ctx = {testCtx: 'testCtx'};

        [req, res, ctx] = coreStep.setEligibilityCookie(req, res, ctx);

        expect([req, res, ctx]).to.deep.equal([
            {testReq: 'testReq'},
            {testRes: 'testRes'},
            {testCtx: 'testCtx'}
        ]);
        done();
    });
});
