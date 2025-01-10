'use strict';

const initSteps = require('app/core/initSteps');
const assert = require('chai').assert;

describe.only('RemoveExecutor', () => {
    const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);

    describe('getContextData', () => {
        it('Removes an executor from the context', (done) => {
            const RemoveExecutor = steps.RemoveExecutor;
            const req = {
                params: ['name_1'],
                session: {
                    form: {}
                },
                body: {
                    executors: {
                        list: [
                            {
                                firstName: 'alias1',
                                lastName: 'one'
                            },
                            {
                                firstName: 'alias2',
                                lastName: 'two'
                            },
                            {
                                firstName: 'alias3',
                                lastName: 'three'
                            }
                        ]
                    }
                }
            };
            const expected = {
                list: [
                    {
                        firstName: 'alias1',
                        lastName: 'one'
                    },
                    {
                        firstName: 'alias3',
                        lastName: 'three'
                    }
                ]
            };
            const ret = RemoveExecutor.getContextData(req);

            assert.deepEqual(expected, ret.executors.list);
            done();
        });
    });

    describe('handlePost', () => {
        it('updates formdata from the context', (done) => {
            let ctx = {
                executors: {
                    list: [
                        {
                            firstName: 'alias1',
                            lastName: 'one'
                        },
                        {
                            firstName: 'alias2',
                            lastName: 'two'
                        },
                        {
                            firstName: 'alias3',
                            lastName: 'three'
                        }
                    ]
                }
            };
            let errors = [];
            const formdata = {};
            const RemoveExecutor = steps.RemoveExecutor;
            [ctx, errors] = RemoveExecutor.handlePost(ctx, errors, formdata);

            assert.deepEqual(ctx.executors.list, formdata.executors.list);
            done();
        });
    });
});
