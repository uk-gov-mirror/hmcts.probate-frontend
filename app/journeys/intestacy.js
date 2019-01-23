'use strict';

const taskList = {
    DeceasedTask: {
        firstStep: 'DeceasedDetails',
        lastStep: 'TaskList',
        summary: 'Summary'
    },
    ExecutorsTask: {
        firstStep: 'RelationshipToDeceased',
        lastStep: 'TaskList',
        summary: 'Summary'
    },
};

const stepList = {
    DeceasedDetails: 'DeceasedAddress',
};

module.exports.stepList = stepList;
module.exports.taskList = taskList;
