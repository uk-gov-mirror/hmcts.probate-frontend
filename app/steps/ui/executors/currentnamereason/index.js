const ValidationStep = require('app/core/steps/ValidationStep');
const {findIndex, get} = require('lodash');

module.exports = class ExecutorCurrentNameReason extends ValidationStep {

    static getUrl(index = '*') {
        return `/executor-current-name-reason/${index}`;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (ctx.list && ctx.list[ctx.index]) {
            ctx.otherExecName = ctx.list[ctx.index].currentName;
        }
        return ctx;
    }

    handlePost(ctx, errors) {
        if (ctx.list) {
            ctx.list[ctx.index].currentNameReason = ctx.aliasReason;
            ctx.list[ctx.index].otherReason = ctx.otherReason;
        }
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

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.aliasReason;
        delete ctx.otherReason;
        return [ctx, formdata];
    }
};
