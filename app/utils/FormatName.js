'use strict';

class FormatName {
    static format(person) {
        person = person || {};
        const firstName = person.firstName || '';
        const lastName = person.lastName || '';
        return `${firstName} ${lastName}`.trim();
    }

    static currentName(person) {
        person = person || {};
        const currentName = person.alias || this.format(person);
        return currentName;
    }

    static aliasReason(person) {
        person = person || {};
        const aliasReason = person.aliasReason || person.currentNameReason || '';
        const otherReason = person.otherReason ? person.otherReason : '';
        const formattedReason = this.formatAliasReason(aliasReason, otherReason) || '';
        return formattedReason;
    }

    static formatAliasReason(aliasReason, otherReason) {
        if (aliasReason === 'Marriage') {
            return 'got married';
        } else if (aliasReason === 'Divorce') {
            return 'got divorced';
        } else if (aliasReason === 'Change by deed poll') {
            return 'changed their name by deed poll';
        } else if (aliasReason === 'other') {
            return `: ${otherReason}`;
        }
    }
}

module.exports = FormatName;
