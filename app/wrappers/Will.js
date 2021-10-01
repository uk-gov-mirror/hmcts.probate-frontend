'use strict';

class Will {
    constructor(will) {
        this.will = will || {};
    }

    resetValues(ctx) {
        if (ctx.willDamageReasonKnown) {
            ctx.willDamageReasonKnown = 'optionNo';
        }

        if (ctx.willDamageReasonDescription) {
            ctx.willDamageReasonDescription = '';
        }

        if (ctx.willDamageCulpritKnown) {
            ctx.willDamageCulpritKnown = 'optionNo';
        }

        if (ctx.willDamageCulpritName) {
            ctx.willDamageCulpritName = {};
        }

        return ctx;
    }

    hasCodicils() {
        return this.will.codicils === 'optionYes';
    }

    codicilsNumber() {
        return this.will.codicilsNumber ? this.will.codicilsNumber : 0;
    }
}

module.exports = Will;
