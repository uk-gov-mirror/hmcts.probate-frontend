'use strict';

class FormatAlias {
    static aliasReason(person, hasMultipleApplicants, isExecutorApplicant, executorCurrentName, lang) {
        person = person || {};
        const aliasReason = person.aliasReason || person.currentNameReason || '';
        const otherReason = person.otherReason ? person.otherReason : '';
        return (hasMultipleApplicants ? this.formatMultipleApplicantAliasReason(aliasReason, otherReason,
            isExecutorApplicant, executorCurrentName, lang) : this.formatAliasReason(aliasReason, otherReason,
            isExecutorApplicant, lang)) || '';
    }

    // eslint-disable-next-line complexity
    static formatMultipleApplicantAliasReason(aliasReason, otherReason, isExecutorApplicant, executorCurrentName, language) {
        if (language === 'en') {
            if (aliasReason === 'optionMarriage') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' got married or formed a civil partnership' : ' They got married or formed a civil partnership';
            } else if (aliasReason === 'optionDivorce') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' got divorced or ended their civil partnership' : ' They got divorced or ended their civil partnership';
            } else if (aliasReason === 'optionDeedPoll') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' changed their name by deed poll' : ' They changed their name by deed poll';
            } else if (aliasReason === 'optionDifferentSpelling') {
                return isExecutorApplicant ? ' ' + executorCurrentName + '‘s name was spelled differently' : ' Their name was spelled differently';
            } else if (aliasReason === 'optionPartOfNameNotIncluded') {
                return isExecutorApplicant ? ' Part of ' + executorCurrentName + '‘s name was not included' : ' Part of their name was not included';
            } else if (aliasReason === 'optionOther') {
                return ` ${otherReason}`;
            }
        } else if (language === 'cy') {
            if (aliasReason === 'optionMarriage') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' Welsh got married or formed a civil partnership' : ' Maent wedi priodi neu wedi ffurfio partneriaeth sifil';
            } else if (aliasReason === 'optionDivorce') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' Welsh got divorced or ended their civil partnership' : ' Maent wedi ysgaru neu wedi dod â’u partneriaeth sifil i ben';
            } else if (aliasReason === 'optionDeedPoll') {
                return isExecutorApplicant ? ' ' + executorCurrentName + ' Welsh changed their name by deed poll' : ' Bu iddynt newid eu henw trwy weithred newid enw';
            } else if (aliasReason === 'optionDifferentSpelling') {
                return isExecutorApplicant ? ' ' + executorCurrentName + '‘s Welsh name was spelled differently' : ' Cafodd eu henw ei sillafu’n wahanol';
            } else if (aliasReason === 'optionPartOfNameNotIncluded') {
                return isExecutorApplicant ? ' Part of ' + executorCurrentName + '‘s Welsh name was not included' : ' Ni chafodd rhan o’u henw ei gynnwys';
            } else if (aliasReason === 'optionOther') {
                return ` ${otherReason}`;
            }
        }
    }

    // eslint-disable-next-line complexity
    static formatAliasReason(aliasReason, otherReason, isExecutorApplicant, language) {
        if (aliasReason === 'optionOther') {
            return isExecutorApplicant ? `: ${otherReason}` : '';
        }
        if (language === 'en') {
            if (aliasReason === 'optionMarriage') {
                return isExecutorApplicant ? ' I got married or formed a civil partnership' : '';
            } else if (aliasReason === 'optionDivorce') {
                return isExecutorApplicant ? ' I got divorced or ended my civil partnership': '';
            } else if (aliasReason === 'optionDeedPoll') {
                return isExecutorApplicant ? ' I changed my name by deed poll' : '';
            } else if (aliasReason === 'optionDifferentSpelling') {
                return isExecutorApplicant ? ' My name was spelled differently' : '';
            } else if (aliasReason === 'optionPartOfNameNotIncluded') {
                return isExecutorApplicant ? ' Part of my name was not included' : '';
            }
        } else if (language === 'cy') {
            if (aliasReason === 'optionMarriage') {
                return isExecutorApplicant ? ' Bu imi briodi neu ffurfio partneriaeth sifil' : '';
            } else if (aliasReason === 'optionDivorce') {
                return isExecutorApplicant ? ' Cefais ysgariad neu daeth fy mhartneriaeth sifil i ben': '';
            } else if (aliasReason === 'optionDeedPoll') {
                return isExecutorApplicant ? ' Newidiais fy enw trwy weithred newid enw' : '';
            } else if (aliasReason === 'optionDifferentSpelling') {
                return isExecutorApplicant ? ' Cafodd fy enw ei sillafu’n wahanol' : '';
            } else if (aliasReason === 'optionPartOfNameNotIncluded') {
                return isExecutorApplicant ? ' Ni chafodd rhan o fy enw ei gynnwys' : '';
            }
        }

    }
}

module.exports = FormatAlias;
