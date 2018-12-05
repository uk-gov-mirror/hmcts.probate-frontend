'use strict';

const EligibilityCookie = require('app/utils/EligibilityCookie');
const {expect} = require('chai');
const sinon = require('sinon');

describe('EligibilityCookie.js', () => {
    describe('checkCookie()', () => {
        it('should redirect if the eligibility cookie does not exist', (done) => {
            const req = {cookies: {}};
            const res = {redirect: sinon.spy()};
            const next = {};
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.checkCookie()(req, res, next);

            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.calledWith('/start-eligibility')).to.equal(true);

            done();
        });

        it('should redirect if the specified page does not exist in the eligibility cookie', (done) => {
            const req = {
                cookies: {
                    __eligibility: JSON.stringify({
                        nextStepUrl: '/will-original',
                        pages: [
                            '/deceased-domicile',
                            '/iht-completed',
                            '/will-left'
                        ]
                    })
                },
                originalUrl: '/death-certificate'
            };
            const res = {redirect: sinon.spy()};
            const next = {};
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.checkCookie()(req, res, next);

            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.calledWith('/start-eligibility')).to.equal(true);

            done();
        });

        it('should continue if the specified page exists in the eligibility cookie', (done) => {
            const req = {
                cookies: {
                    __eligibility: JSON.stringify({
                        nextStepUrl: '/death-certificate',
                        pages: [
                            '/death-certificate',
                            '/deceased-domicile',
                            '/iht-completed',
                            '/will-left'
                        ]
                    })
                },
                originalUrl: '/death-certificate'
            };
            const res = {};
            const next = sinon.spy();
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.checkCookie()(req, res, next);

            expect(next.calledOnce).to.equal(true);

            done();
        });
    });

    describe('setCookie()', () => {
        it('should add the next step to the cookie if the current page exists in the cookie', (done) => {
            const req = {originalUrl: '/deceased-domicile'};
            const res = {};
            const nextStepUrl = '/death-certificate';
            const eligibilityCookie = new EligibilityCookie();
            const readCookieStub = sinon.stub(eligibilityCookie, 'readCookie').returns({
                pages: [
                    '/deceased-domicile',
                    '/iht-completed',
                    '/will-left'
                ]
            });
            const writeCookieStub = sinon.stub(eligibilityCookie, 'writeCookie');

            eligibilityCookie.setCookie(req, res, nextStepUrl);

            expect(eligibilityCookie.writeCookie.calledOnce).to.equal(true);
            expect(eligibilityCookie.writeCookie.calledWith(
                {originalUrl: '/deceased-domicile'},
                {},
                {
                    pages: [
                        '/deceased-domicile',
                        '/iht-completed',
                        '/will-left'
                    ],
                    nextStepUrl: '/death-certificate'
                }
            )).to.equal(true);

            readCookieStub.restore();
            writeCookieStub.restore();
            done();
        });

        it('should add the next step and the current page to the cookie if the current page does not exist in the cookie', (done) => {
            const req = {originalUrl: '/deceased-domicile'};
            const res = {};
            const nextStepUrl = '/death-certificate';
            const eligibilityCookie = new EligibilityCookie();
            const readCookieStub = sinon.stub(eligibilityCookie, 'readCookie').returns({
                pages: [
                    '/iht-completed',
                    '/will-left'
                ]
            });
            const writeCookieStub = sinon.stub(eligibilityCookie, 'writeCookie');

            eligibilityCookie.setCookie(req, res, nextStepUrl);

            expect(eligibilityCookie.writeCookie.calledOnce).to.equal(true);
            expect(eligibilityCookie.writeCookie.calledWith(
                {originalUrl: '/deceased-domicile'},
                {},
                {
                    pages: [
                        '/iht-completed',
                        '/will-left',
                        '/deceased-domicile'
                    ],
                    nextStepUrl: '/death-certificate'
                }
            )).to.equal(true);

            readCookieStub.restore();
            writeCookieStub.restore();
            done();
        });
    });

    describe('readCookie()', () => {
        it('should return a default json object if the eligibility cookie does not exist', (done) => {
            const req = {};
            const eligibilityCookie = new EligibilityCookie();
            const json = eligibilityCookie.readCookie(req);

            expect(json).to.deep.equal({
                nextStepUrl: '',
                pages: []
            });

            done();
        });

        it('should return a json object of the eligibility cookie if the eligibility cookie exists', (done) => {
            const req = {
                cookies: {
                    __eligibility: JSON.stringify({
                        nextStepUrl: '/iht-completed',
                        pages: ['/will-left']
                    })
                }
            };
            const eligibilityCookie = new EligibilityCookie();
            const json = eligibilityCookie.readCookie(req);

            expect(json).to.deep.equal({
                nextStepUrl: '/iht-completed',
                pages: ['/will-left']
            });

            done();
        });
    });

    describe('writeCookie()', () => {
        it('should set a cookie on https', (done) => {
            const req = {protocol: 'https'};
            const res = {cookie: sinon.spy()};
            const json = {
                nextStepUrl: '/iht-completed',
                pages: ['/will-left']
            };
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.writeCookie(req, res, json);

            expect(res.cookie.calledOnce).to.equal(true);
            expect(res.cookie.calledWith(
                '__eligibility',
                JSON.stringify({
                    nextStepUrl: '/iht-completed',
                    pages: ['/will-left']
                }),
                {secure: true, httpOnly: true}
            )).to.equal(true);

            done();
        });

        it('should set a cookie on http', (done) => {
            const req = {};
            const res = {cookie: sinon.spy()};
            const json = {
                nextStepUrl: '/iht-completed',
                pages: ['/will-left']
            };
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.writeCookie(req, res, json);

            expect(res.cookie.calledOnce).to.equal(true);
            expect(res.cookie.calledWith(
                '__eligibility',
                JSON.stringify({
                    nextStepUrl: '/iht-completed',
                    pages: ['/will-left']
                }),
                {httpOnly: true}
            )).to.equal(true);

            done();
        });
    });
});
