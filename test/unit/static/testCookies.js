'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
let steps = null; // initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
let Cookies = null; // steps.Cookies;

describe('Cookies', () => {
    before(() => {
        steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
        Cookies = steps.Cookies;
    });

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Cookies.constructor.getUrl();
            expect(url).to.equal('/cookies');
            done();
        });
    });

    describe('check auth cookie name', () => {
        it('should return the correct url', (done) => {
            expect(Cookies.SECURITY_COOKIE).to.equal('__auth-token-4.1.1');
            done();
        });
    });
});
