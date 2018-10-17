'use strict';

const Step = require('app/core/steps/Step');
const OptionGetRunner = require('app/core/runners/OptionGetRunner');
const FieldError = require('app/components/error');
const {isEmpty, map, includes} = require('lodash');
const utils = require('app/components/step-utils');
const services = require('app/components/services');
const ExecutorsWrapper = require('app/wrappers/Executors');
const WillWrapper = require('app/wrappers/Will');
const FormatName = require('app/utils/FormatName');
const featureToggle = require('app/utils/FeatureToggle');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;


class Summary extends Step {

    runner() {
        return new OptionGetRunner();
    }

    static getUrl(redirect = '*') {
        return `/summary/${redirect}`;
    }

    * handleGet(ctx, formdata, featureToggles) {
        const result = yield this.validateFormData(ctx, formdata);
        const errors = map(result.errors, err => {
            return FieldError(err.param, err.code, this.resourcePath, ctx);
        });
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        const executorsApplying = executorsWrapper.executorsApplying(true);

        ctx.executorsAlive = executorsWrapper.hasAliveExecutors();
        ctx.executorsWhoDied = executorsWrapper.deadExecutors().map(exec => exec.fullName);
        ctx.executorsDealingWithEstate = executorsApplying.map(exec => exec.fullName);
        ctx.executorsPowerReservedOrRenounced = executorsWrapper.hasRenunciatedOrPowerReserved();
        ctx.isMainApplicantAliasToggleEnabled = featureToggle.isEnabled(featureToggles, 'main_applicant_alias');
        ctx.executorsWithOtherNames = executorsWrapper.executorsWithAnotherName().map(exec => exec.fullName);

        utils.updateTaskStatus(ctx, ctx, this.steps);

        formdata.serviceAuthToken = yield services.authorise();

        return [ctx, !isEmpty(errors) ? errors : null];
    }

    validateFormData(ctx, formdata) {
        return services.validateFormData(formdata, ctx.sessionID);
    }

    generateContent (ctx, formdata) {
        const content = {};

        Object.keys(this.steps)
            .filter((stepName) => stepName !== this.name)
            .forEach((stepName) => {
                const step = this.steps[stepName];
                content[stepName] = step.generateContent(formdata[step.section], formdata);
                content[stepName].url = step.constructor.getUrl();
            });
        content[this.name] = super.generateContent(ctx, formdata);
        content[this.name].url = Summary.getUrl();
        return content;
    }

    generateFields (ctx, errors, formdata) {
        const fields = {};
        Object.keys(this.steps)
            .filter((stepName) => stepName !== this.name)
            .forEach((stepName) => {
                const step = this.steps[stepName];
                if (isEmpty(fields[step.section])) {
                    fields[step.section] = step.generateFields(formdata[step.section], errors, formdata);
                }
            });
        fields[this.section] = super.generateFields(ctx, errors, formdata);
        return fields;
    }

    getContextData (req) {
        const formdata = req.session.form;
        formdata.summary = {'readyToDeclare': includes(req.url, 'declaration')};
        const ctx = super.getContextData(req);
        const willWrapper = new WillWrapper(formdata.will);
        const deceasedName = FormatName.format(formdata.deceased);
        const content = this.generateContent(ctx, formdata);
        const hasCodicils = willWrapper.hasCodicils();

        ctx.deceasedAliasQuestion = content.DeceasedAlias.question
            .replace('{deceasedName}', deceasedName ? deceasedName : content.DeceasedAlias.theDeceased);
        ctx.deceasedMarriedQuestion = (hasCodicils ? content.DeceasedMarried.questionWithCodicil : content.DeceasedMarried.question)
            .replace('{deceasedName}', deceasedName);
        ctx.softStop = this.anySoftStops(formdata, ctx);
        ctx.alreadyDeclared = this.alreadyDeclared(req.session);
        ctx.session = req.session;


        return ctx;
    }

    renderCallBack(res, html) {

        var summary = this.parseData(html);
        res.req.session.checkAnswersSummary = summary;

        res.send(html);
    }


    parseData(html) {
        const dom = new JSDOM(html);
        const $ = (require('jquery'))(dom.window);
        const summary = new Object()
        summary.sections = [];
        const sections = $(".heading-large, .heading-medium, .heading-small, .check-your-answers__row");
        const mainParagraph = $("#main-heading-content");
        summary.mainParagraph = mainParagraph.html();
        var section;

        for (var i = 0; i < sections.length; i++) {
            const $element = $(sections[i]);

            if ($element.hasClass("heading-large")) {
                summary.pageTitle = $element.html();
            }

            if ($element.hasClass("heading-medium") || $element.hasClass("heading-small")) {
                section = new Object();
                section.title = $element.html();
                section.type = $element.attr('class');
                section.questionAndAnswers = [];
                summary.sections.push(section)
            }

            if ($element.hasClass("check-your-answers__row") && $element.children().length > 0) {
                const question = $element.children(".check-your-answers__question");
                const answer = $element.children(".check-your-answers__answer");
                const questionAndAnswer = new Object();

                questionAndAnswer.question = question.html();
                questionAndAnswer.answers = [];
                const children = answer.children(".check-your-answers__row");
                if (children.length > 0) {

                    for (var j = 0; j < children.length; ++j) {
                        questionAndAnswer.answers.push(children[j].textContent);
                    }
                }
                else {
                    questionAndAnswer.answers.push(answer.html());
                }
                section.questionAndAnswers.push(questionAndAnswer);
            }

            var sectionTitle = $element.html();
        }

       // return JSON.stringify({'checkAnswersSummary': summary}, null, 2);
        return summary;
    }


}

module.exports = Summary;
