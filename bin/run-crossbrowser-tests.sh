#!/bin/bash
set -ex

EXIT_STATUS=0
yarn test:crossbrowser_chrome || EXIT_STATUS=$?
yarn test:crossbrowser_firefox || EXIT_STATUS=$?
yarn test:crossbrowser_safari || EXIT_STATUS=$?
yarn test:crossbrowser_IE11 || EXIT_STATUS=$?
yarn test:crossbrowser_Edge || EXIT_STATUS=$?
echo EXIT_STATUS: $EXIT_STATUS
exit $EXIT_STATUS
