'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {findIndex, get} = require('lodash');
const ExecutorsWrapper = require('app/wrappers/Executors');

module.exports = class ExecutorCurrentNameReason extends ValidationStep {

    static getUrl(index = '*') {
        return `/executor-current-name-reason/${index}`;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (req.params && !isNaN(req.params[0])) {
            ctx.index = parseInt(req.params[0]);
        }
        if (ctx.list && ctx.list[ctx.index]) {
            ctx.otherExecName = ctx.list[ctx.index].currentName;
        }
        return ctx;
    }

    handlePost(ctx, errors) {
        if (ctx.otherReason) {
            ctx.list[ctx.index].otherReason = ctx.otherReason;
        }
        ctx.list[ctx.index].currentNameReason = ctx.aliasReason;
        ctx.index = this.recalcIndex(ctx, ctx.index);
        return [ctx, errors];
    }

    recalcIndex(ctx, index) {
        return findIndex(ctx.list, o => o.hasOtherName, index + 1);
    }

    nextStepOptions(ctx) {
        ctx.continue = get(ctx, 'index', -1) !== -1;
        const nextStepOptions = {
            options: [
                {key: 'continue', value: true, choice: 'continue'},
            ],
        };
        return nextStepOptions;
    }

    isComplete(ctx) {
        const executorsWrapper = new ExecutorsWrapper(ctx);
        return [executorsWrapper.executorsWithAnotherName().every(exec => exec.currentNameReason), 'inProgress'];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.aliasReason;
        delete ctx.otherReason;
        return [ctx, formdata];
    }
};
