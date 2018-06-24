#!/bin/bash
set -ex

export TEST_E2E_URL=$(echo ${TEST_URL} | sed -e  "s/-staging//")

yarn test-e2e

