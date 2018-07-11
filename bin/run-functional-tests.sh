#!/bin/bash
set -ex

export TEST_E2E_URL=$(echo ${TEST_URL})

if [ "$RUN_E2E_TEST" = true ] ; then
    yarn test-e2e
    #below 2 lines for function test output in cnp pipeline
    mkdir functional-output
    cp -r output/mochawesome.* functional-output/. 2>/dev/null  //fail safe
fi

