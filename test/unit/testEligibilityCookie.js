'use strict';

const EligibilityCookie = require('app/utils/EligibilityCookie');
const {expect} = require('chai');
const sinon = require('sinon');
const config = require('app/config');

describe('EligibilityCookie.js', () => {
    describe('checkCookie()', () => {
        it('should redirect if the eligibility cookie does not exist', (done) => {
            const req = {cookies: {}};
            const res = {redirect: sinon.spy()};
            const next = {};
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.checkCookie()(req, res, next);

            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.calledWith('/new-start-eligibility')).to.equal(true);

            done();
        });

        it('should redirect if the specified page does not exist in the eligibility cookie', (done) => {
            const req = {
                cookies: {
                    __eligibility: JSON.stringify({
                        nextStepUrl: '/new-will-original',
                        pages: [
                            '/new-deceased-domicile',
                            '/new-iht-completed',
                            '/new-will-left'
                        ]
                    })
                },
                originalUrl: '/new-death-certificate'
            };
            const res = {redirect: sinon.spy()};
            const next = {};
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.checkCookie()(req, res, next);

            expect(res.redirect.calledOnce).to.equal(true);
            expect(res.redirect.calledWith('/new-start-eligibility')).to.equal(true);

            done();
        });

        it('should continue if the specified page exists in the eligibility cookie', (done) => {
            const req = {
                cookies: {
                    __eligibility: JSON.stringify({
                        nextStepUrl: '/new-death-certificate',
                        pages: [
                            '/new-death-certificate',
                            '/new-deceased-domicile',
                            '/new-iht-completed',
                            '/new-will-left'
                        ]
                    })
                },
                originalUrl: '/new-death-certificate'
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
            const req = {originalUrl: '/new-deceased-domicile'};
            const res = {};
            const nextStepUrl = '/new-death-certificate';
            const answer = 'Yes';
            const eligibilityCookie = new EligibilityCookie();
            const readCookieStub = sinon.stub(eligibilityCookie, 'readCookie').returns({
                pages: [
                    {url: '/new-iht-completed', answer: 'Yes'},
                    {url: '/new-will-left', answer: 'Yes'},
                    {url: '/new-deceased-domicile', answer: 'Yes'}
                ]
            });
            const writeCookieStub = sinon.stub(eligibilityCookie, 'writeCookie');

            eligibilityCookie.setCookie(req, res, nextStepUrl, answer);

            expect(eligibilityCookie.writeCookie.calledOnce).to.equal(true);
            expect(eligibilityCookie.writeCookie.calledWith(
                {originalUrl: '/new-deceased-domicile'},
                {},
                {
                    pages: [
                        {url: '/new-iht-completed', answer: 'Yes'},
                        {url: '/new-will-left', answer: 'Yes'},
                        {url: '/new-deceased-domicile', answer: 'Yes'}
                    ],
                    nextStepUrl: '/new-death-certificate'
                }
            )).to.equal(true);

            readCookieStub.restore();
            writeCookieStub.restore();
            done();
        });

        it('should add the next step and the current page to the cookie if the current page does not exist in the cookie', (done) => {
            const req = {originalUrl: '/new-deceased-domicile'};
            const res = {};
            const nextStepUrl = '/new-death-certificate';
            const answer = 'Yes';
            const eligibilityCookie = new EligibilityCookie();
            const readCookieStub = sinon.stub(eligibilityCookie, 'readCookie').returns({
                pages: [
                    {url: '/new-iht-completed', answer: 'Yes'},
                    {url: '/new-will-left', answer: 'Yes'}
                ]
            });
            const writeCookieStub = sinon.stub(eligibilityCookie, 'writeCookie');

            eligibilityCookie.setCookie(req, res, nextStepUrl, answer);

            expect(eligibilityCookie.writeCookie.calledOnce).to.equal(true);
            expect(eligibilityCookie.writeCookie.calledWith(
                {originalUrl: '/new-deceased-domicile'},
                {},
                {
                    pages: [
                        {url: '/new-iht-completed', answer: 'Yes'},
                        {url: '/new-will-left', answer: 'Yes'},
                        {url: '/new-deceased-domicile', answer: 'Yes'}
                    ],
                    nextStepUrl: '/new-death-certificate'
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
                        nextStepUrl: '/new-iht-completed',
                        pages: ['/new-will-left']
                    })
                }
            };
            const eligibilityCookie = new EligibilityCookie();
            const json = eligibilityCookie.readCookie(req);

            expect(json).to.deep.equal({
                nextStepUrl: '/new-iht-completed',
                pages: ['/new-will-left']
            });

            done();
        });
    });

    describe('writeCookie()', () => {
        it('should set a cookie on https', (done) => {
            const req = {protocol: 'https'};
            const res = {cookie: sinon.spy()};
            const json = {
                nextStepUrl: '/new-iht-completed',
                pages: [
                    {
                        url: '/new-will-left',
                        answer: 'Yes'
                    }
                ]
            };
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.writeCookie(req, res, json);

            expect(res.cookie.calledOnce).to.equal(true);
            expect(res.cookie.calledWith(
                config.redis.eligibilityCookie.name,
                JSON.stringify({
                    nextStepUrl: '/new-iht-completed',
                    pages: [
                        {
                            url: '/new-will-left',
                            answer: 'Yes'
                        }
                    ]
                }),
                {httpOnly: true, secure: true, expires: new Date(Date.now() + config.redis.eligibilityCookie.expires)}
            )).to.equal(true);

            done();
        });

        it('should set a cookie on http', (done) => {
            const req = {};
            const res = {cookie: sinon.spy()};
            const json = {
                nextStepUrl: '/new-iht-completed',
                pages: [
                    {
                        url: '/new-will-left',
                        answer: 'Yes'
                    }
                ]
            };
            const eligibilityCookie = new EligibilityCookie();

            eligibilityCookie.writeCookie(req, res, json);

            expect(res.cookie.calledOnce).to.equal(true);
            expect(res.cookie.calledWith(
                config.redis.eligibilityCookie.name,
                JSON.stringify({
                    nextStepUrl: '/new-iht-completed',
                    pages: [
                        {
                            url: '/new-will-left',
                            answer: 'Yes'
                        }
                    ]
                }),
                {httpOnly: true, expires: new Date(Date.now() + config.redis.eligibilityCookie.expires)}
            )).to.equal(true);

            done();
        });
    });
});
