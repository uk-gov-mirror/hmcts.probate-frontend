'use strict';

const co = require('co');
const request = require('supertest');
const a11y = require('test/util/a11y');
const {expect} = require('chai');
const app = require('app');
const initSteps = require('app/core/initSteps');
const {endsWith, has} = require('lodash');
const sinon = require('sinon');
const commonContent = require('app/resources/en/translation/common');
const services = require('app/components/services');
const stepsToExclude = ['Summary', 'TaskList', 'PinPage', 'PinSent', 'PinResend', 'AddressLookup', 'ExecutorAddress', 'ExecutorContactDetails', 'ExecutorName', 'ExecutorNotified', 'ExecutorNameAsOnWill', 'ExecutorApplying', 'DeleteExecutor', 'PaymentStatus', 'AddAlias', 'RemoveAlias', 'ExecutorRoles', 'ExecutorsWhenDied'];
const stepsRequiringScreeningQuestionsToggleOn = [
    'NewStartEligibility',
    'NewDeathCertificate',
    'NewDeceasedDomicile',
    'NewIhtCompleted',
    'NewWillLeft',
    'NewWillOriginal',
    'NewApplicantExecutor',
    'NewMentalCapacity',
    'NewStartApply'
];
const stepsRequiringEligibilityCookie = {
    'NewDeathCertificate': '/new-death-certificate',
    'NewDeceasedDomicile': '/new-deceased-domicile',
    'NewIhtCompleted': '/new-iht-completed',
    'NewWillLeft': '/new-will-left',
    'NewWillOriginal': '/new-will-original',
    'NewApplicantExecutor': '/new-applicant-executor',
    'NewMentalCapacity': '/new-mental-capacity',
    'NewStartApply': '/new-start-apply'
};
const steps = initSteps.steps;
let checkAllAgreedStub;

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const screeningQuestionsfeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;
const mainApplicantAliasfeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.main_applicant_alias}`;

const Cookie = require('cookiejar');
const cookieJar = Cookie.CookieJar();

let cookieString;
const cookie = {
    name: '__eligibility',
    content: {
        nextStepUrl: '',
        pages: [
            stepsRequiringEligibilityCookie.NewDeathCertificate,
            stepsRequiringEligibilityCookie.NewDeceasedDomicile,
            stepsRequiringEligibilityCookie.NewIhtCompleted,
            stepsRequiringEligibilityCookie.NewWillLeft,
            stepsRequiringEligibilityCookie.NewWillOriginal,
            stepsRequiringEligibilityCookie.NewApplicantExecutor,
            stepsRequiringEligibilityCookie.NewMentalCapacity
        ]
    }
};

Object.keys(steps)
    .filter(stepName => stepsToExclude.includes(stepName))
    .forEach(stepName => delete steps[stepName]);

for (const step in steps) {
    ((step) => {
        let results;

        if (step.name === 'NewApplicantExecutor') {
            describe(`Verify accessibility for the page ${step.name}`, () => {
                const server = app.init();
                let agent;

                const title = `${step.content.title} - ${commonContent.serviceName}`
                    .replace(/&lsquo;/g, '‘')
                    .replace(/&rsquo;/g, '’')
                    .replace(/\(/g, '\\(')
                    .replace(/\)/g, '\\)');

                before((done) => {
                    agent = request.agent(server.app);

                    checkAllAgreedStub = sinon.stub(services, 'checkAllAgreed')
                        .returns(Promise.resolve('false'));

                    nock(featureToggleUrl)
                        .get(mainApplicantAliasfeatureTogglePath)
                        .reply(200, 'true');

                    if (stepsRequiringScreeningQuestionsToggleOn.indexOf(step.name) !== -1) {
                        console.log(`>>>>>>>>>>>>>>>>>> ${step.name}: screening questions toggle ON`);
                        nock(featureToggleUrl)
                            .get(screeningQuestionsfeatureTogglePath)
                            .reply(200, 'true');
                    }

                    if (has(stepsRequiringEligibilityCookie, step.name)) {
                        console.log(`>>>>>>>>>>>>>>>>>> ${step.name}: eligibility cookie ON`);
                        cookie.content.nextStepUrl = stepsRequiringEligibilityCookie[step.name];
                        cookieString = `${cookie.name}=${JSON.stringify(cookie.content)}`;

                        cookieJar.setCookies(cookieString);

                        const cookieValue = cookieJar.getCookie('__eligibility', Cookie.CookieAccessInfo.All);
                        console.log('>>>>>>>>>>>>>>>>>> Cookie value:');
                        console.log(JSON.parse(cookieValue.value));
                    }

                    co(function* () {
                        let urlSuffix = '';
                        if (endsWith(agent.get(step.constructor.getUrl()), '*')) {
                            urlSuffix = '/0';
                        }
                        results = yield a11y(agent.get(step.constructor.getUrl()).url + urlSuffix, title);
                    })
                        .then(done, done)
                        .catch((error) => {
                            done(error);
                        });
                });

                after(function (done) {
                    checkAllAgreedStub.restore();
                    nock.cleanAll();

                    server.http.close();
                    done();
                });

                it('should not generate any errors', () => {
                    const errors = results.filter((res) => res.type === 'error');
                    expect(errors.length).to.equal(0, JSON.stringify(errors, null, 2));
                });

                it('should not generate any warnings', () => {
                    const warnings = results.filter((res) => res.type === 'warning');
                    expect(warnings.length).to.equal(0, JSON.stringify(warnings, null, 2));
                });
            });
        }

    })(steps[step]);
}
