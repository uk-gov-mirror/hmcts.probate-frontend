'use strict';

class FormatAlias {
    static aliasReason(person, hasMultipleApplicants, isExecutorApplicant, executorCurrentName, language) {
        person = person || {};
        const aliasReason = person.aliasReason || person.currentNameReason || '';
        const otherReason = person.otherReason ? person.otherReason : '';
        return (hasMultipleApplicants ? this.formatMultipleApplicantAliasReason(aliasReason, otherReason,
            isExecutorApplicant, executorCurrentName, language) : this.formatAliasReason(aliasReason, otherReason,
            isExecutorApplicant, language)) || '';
    }

    static formatMultipleApplicantAliasReason(aliasReason, otherReason, isExecutorApplicant, executorCurrentName, language) {
        if (aliasReason === 'optionOther') {
            return ` ${otherReason}`;
        }
        if (language === 'en') {
            return FormatAlias.englishMultipleAliasReason(aliasReason, isExecutorApplicant, executorCurrentName);
        } else if (language === 'cy') {
            return FormatAlias.welshMultipleAliasReason(aliasReason, isExecutorApplicant, executorCurrentName);
        }
    }

    static formatAliasReason(aliasReason, otherReason, isExecutorApplicant, language) {
        if (aliasReason === 'optionOther') {
            return isExecutorApplicant ? `: ${otherReason}` : '';
        }
        if (language === 'en') {
            return FormatAlias.englishSingleAliasReason(aliasReason);
        } else if (language === 'cy') {
            return FormatAlias.welshSingleAliasReason(aliasReason);
        }
    }

    static englishMultipleAliasReason(aliasReason) {
        if (aliasReason === 'optionMarriage') {
            return ' They got married or formed a civil partnership';
        } else if (aliasReason === 'optionDivorce') {
            return ' They got divorced or ended their civil partnership';
        } else if (aliasReason === 'optionDeedPoll') {
            return ' They changed their name by deed poll';
        } else if (aliasReason === 'optionDifferentSpelling') {
            return ' Their name was spelled differently';
        } else if (aliasReason === 'optionPartOfNameNotIncluded') {
            return ' Part of their name was not included';
        }
    }

    static welshMultipleAliasReason(aliasReason) {
        if (aliasReason === 'optionMarriage') {
            return ' Maent wedi priodi neu wedi ffurfio partneriaeth sifil';
        } else if (aliasReason === 'optionDivorce') {
            return ' Maent wedi ysgaru neu wedi dod â’u partneriaeth sifil i ben';
        } else if (aliasReason === 'optionDeedPoll') {
            return ' Bu iddynt newid eu henw trwy weithred newid enw';
        } else if (aliasReason === 'optionDifferentSpelling') {
            return ' Cafodd eu henw ei sillafu’n wahanol';
        } else if (aliasReason === 'optionPartOfNameNotIncluded') {
            return ' Ni chafodd rhan o’u henw ei gynnwys';
        }
    }

    static englishSingleAliasReason(aliasReason) {
        if (aliasReason === 'optionMarriage') {
            return ' I got married or formed a civil partnership';
        } else if (aliasReason === 'optionDivorce') {
            return ' I got divorced or ended my civil partnership';
        } else if (aliasReason === 'optionDeedPoll') {
            return ' I changed my name by deed poll';
        } else if (aliasReason === 'optionDifferentSpelling') {
            return ' My name was spelled differently';
        } else if (aliasReason === 'optionPartOfNameNotIncluded') {
            return ' Part of my name was not included';
        }
    }

    static welshSingleAliasReason(aliasReason) {
        if (aliasReason === 'optionMarriage') {
            return ' Bu imi briodi neu ffurfio partneriaeth sifil';
        } else if (aliasReason === 'optionDivorce') {
            return ' Cefais ysgariad neu daeth fy mhartneriaeth sifil i ben';
        } else if (aliasReason === 'optionDeedPoll') {
            return ' Newidiais fy enw trwy weithred newid enw';
        } else if (aliasReason === 'optionDifferentSpelling') {
            return ' Cafodd fy enw ei sillafu’n wahanol';
        } else if (aliasReason === 'optionPartOfNameNotIncluded') {
            return ' Ni chafodd rhan o fy enw ei gynnwys';
        }
    }
}

module.exports = FormatAlias;
