'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const {findIndex} = require('lodash');
const FormatName = require('../../../../utils/FormatName');
const ExecutorsWrapper = require('app/wrappers/Executors');
const pageUrl = '/executors-alias';

class ExecutorsAlias extends ValidationStep {
    static getUrl(index = '*') {
        return `${pageUrl}/${index}`;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        if (req.params && !isNaN(req.params[0])) {
            ctx.index = parseInt(req.params[0]);
        } else {
            ctx.index = this.recalcIndex(ctx, 0);
            ctx.redirect = `${pageUrl}/${ctx.index}`;
        }
        ctx.otherExecName = ctx.list && ctx.list[ctx.index] ? ctx.list[ctx.index].fullName : '';
        ctx.deceasedName = FormatName.format(req.session.form.deceased);
        return ctx;
    }

    recalcIndex(ctx, index) {
        return findIndex(ctx.list, o => o.isApplying === true && o.isDead !== true, index + 1);
    }

    pruneFormData(ctx) {
        if (ctx.list && ctx.list[ctx.index].hasOtherName === false) {
            delete ctx.list[ctx.index].currentName;
            delete ctx.list[ctx.index].currentNameReason;
            delete ctx.list[ctx.index].otherReason;
        }
        return ctx;
    }
    handleGet(ctx) {
        if (ctx.list && ctx.list[ctx.index]) {
            if (ctx.list[ctx.index].hasOtherName === true) {
                ctx.alias = 'optionYes';
            } else if (ctx.list[ctx.index].hasOtherName === false) {
                ctx.alias = 'optionNo';
            } else {
                ctx.alias = '';
            }
        }
        return [ctx];
    }
    handlePost(ctx, errors) {
        if (ctx.list[ctx.index].isApplying && ctx.alias === 'optionYes') {
            ctx.list[ctx.index].hasOtherName = true;
        } else if (ctx.list[ctx.index].isApplying && ctx.alias === 'optionNo') {
            ctx.list[ctx.index].hasOtherName = false;
            ctx = this.pruneFormData(ctx);
        }
        return [ctx, errors];
    }

    nextStepUrl(req, ctx) {
        if (ctx.alias === 'optionNo') {
            const nextIndex = this.recalcIndex(ctx, ctx.index);
            if (nextIndex !== -1) {
                return ExecutorsAlias.getUrl(nextIndex);
            }
            return '/executor-contact-details/1';
        } else if (ctx.alias === 'optionYes') {
            return `/executor-id-name/${ctx.index}`;
        }
        return this.next(req, ctx).constructor.getUrl(ctx.index);
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'alias', value: 'optionYes', choice: 'withAlias'}
            ]
        };
    }

    isComplete(ctx) {
        const executorsWrapper = new ExecutorsWrapper(ctx);
        const executors = executorsWrapper.executorsList;

        const allExecutorsValid = executors.every(executor => {
            if (executor.isApplying) {
                return executor.hasOtherName === true || executor.hasOtherName === false;
            }
            return true;
        });

        return [allExecutorsValid, 'inProgress'];
    }

    generateFields(language, ctx, errors) {
        const fields = super.generateFields(language, ctx, errors);
        if (fields.otherExecName && errors) {
            errors[0].msg = errors[0].msg.replace('{executorName}', fields.otherExecName.value);
        }
        return fields;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.index;
        delete ctx.alias;
        delete ctx.continue;
        return [ctx, formdata];
    }
}

module.exports = ExecutorsAlias;
