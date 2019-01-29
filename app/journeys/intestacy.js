'use strict';

const taskList = {
    DeceasedTask: {
        firstStep: 'DeceasedDetails',
        lastStep: 'TaskList',
        summary: 'Summary'
    },
    // ExecutorsTask: {
    //     firstStep: 'RelationshipToDeceased',
    //     lastStep: 'TaskList',
    //     summary: 'Summary'
    // },
};

const stepList = {
    StartEligibility: 'DeathCertificate',
    DeathCertificate: {
        hasCertificate: 'DeceasedDomicile',
        otherwise: 'StopPage'
    },
    DeceasedDomicile: {
        inEnglandOrWales: 'IhtCompleted',
        otherwise: 'StopPage'
    },
    IhtCompleted: {
        completed: 'WillLeft',
        otherwise: 'StopPage'
    },
    WillLeft: {
        withWill: 'WillOriginal',
        withoutWillToggleOn: 'DiedAfterOctober2014',
        otherwise: 'StopPage'
    },
    // Intestacy --------------------------------
    DiedAfterOctober2014: {
        diedAfter: 'RelationshipToDeceased',
        otherwise: 'StopPage'
    },
    RelationshipToDeceased: {
        related: 'OtherApplicants',
        otherwise: 'StopPage'
    },
    OtherApplicants: {
        noOthers: 'StartApply',
        otherwise: 'StopPage'
    },
    // ------------------------------------------
    StartApply: 'TaskList',
    // DeceasedDetails: 'DeceasedAddress',
    DeceasedDetails: 'TaskList',

    Summary: 'TaskList',
    TaskList: 'TaskList',
    StopPage: 'StopPage'
};

module.exports.stepList = stepList;
module.exports.taskList = taskList;
