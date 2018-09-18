'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;

describe('ExecutorCurrentName', () => {
    const steps = initSteps([__dirname + '/../../app/steps/action/', __dirname + '/../../app/steps/ui']);

    describe('getContextData()', () => {
        it('sets the index when there is a numeric url param', (done) => {
            const req = {
                session: {
                    form: {
                        executors: {
                            list: []
                        }
                    }
                },
                params: [1]
            };
            const ExecutorCurrentName = steps.ExecutorCurrentName;
            const ctx = ExecutorCurrentName.getContextData(req);

            expect(ctx.index).to.equal(req.params[0]);
            done();
        });
    });
});
