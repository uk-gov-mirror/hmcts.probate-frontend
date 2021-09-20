'use strict';

class Will {
    constructor(will) {
        this.will = will || {};
    }

    hasVisibleDamage() {
        return this.will.willHasVisibleDamage === 'optionYes';
    }

    hasCodicils() {
        return this.will.codicils === 'optionYes';
    }

    codicilsNumber() {
        return this.will.codicilsNumber ? this.will.codicilsNumber : 0;
    }
}

module.exports = Will;
