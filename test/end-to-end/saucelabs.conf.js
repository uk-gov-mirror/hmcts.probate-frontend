/* eslint-disable no-console */

const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

const browser = process.env.SAUCELABS_BROWSER || 'chrome';
const tunnelName = process.env.TUNNEL_IDENTIFIER || 'reformtunnel';

const getBrowserConfig = (browserGroup) => {
    const browserConfig = [];
    for (const candidateBrowser in supportedBrowsers[browserGroup]) {
        if (candidateBrowser) {
            const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
            desiredCapability.tunnelIdentifier = tunnelName;
            desiredCapability.tags = ['probate'];
            browserConfig.push({
                browser: desiredCapability.browserName,
                desiredCapabilities: desiredCapability
            });
        } else {
            console.error('ERROR: supportedBrowsers.js is empty or incorrectly defined');
        }
    }
    return browserConfig;
};

const setupConfig = {
    'tests': './paths/probate/singleExecutorsPath.js',
    'output': './output',
    'timeout': 20000,
    'helpers': {
        WebDriverIO: {
            url: process.env.TEST_E2E_FRONTEND_URL || 'https://probate-frontend-aat.service.core-compute-aat.internal',
            //'https://localhost:3000',
            browser,
            smartWait: 60000,
            waitforTimeout: 60000,
            cssSelectorsEnabled: 'true',
            windowSize: '1600x900',
            timeouts: {
                script: 60000,
                'page load': 60000,
                implicit: 20000
            },
            'host': 'ondemand.eu-central-1.saucelabs.com',
            'port': 80,
            'region': 'eu',
            'user': process.env.SAUCE_USERNAME || 'Douglas.Rice',
            'key': process.env.SAUCE_ACCESS_KEY || '609b4570-4459-4421-a699-f3c17c61eabc',
            desiredCapabilities: {}
        },
        'SauceLabsReportingHelper': {
            'require': './helpers/SauceLabsReportingHelper.js'
        },
        'WebDriverHelper': {
            'require': './helpers/WebDriverHelper.js'
        }
    },
    'plugins': {
        'retryFailedStep': {
            'enabled': true
        },
        'autoDelay': {
            'enabled': true
        }
    },
    'include': {
        'I': './pages/steps.js'
    },
    'mocha': {
        'reporterOptions': {
            'reportDir': process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './output',
            'reportName': browser + '_report',
            'reportTitle': 'Crossbrowser results for: ' + browser.toUpperCase(),
            'inlineAssets': true
        }
    },
    'multiple': {
        microsoftIE11: {
            browsers: getBrowserConfig('microsoftIE11')
        }
        // ,
        // microsoftEdge: {
        //     browsers: getBrowserConfig('microsoftEdge')
        // },
        // chrome: {
        //     browsers: getBrowserConfig('chrome')
        // },
        // firefox: {
        //     browsers: getBrowserConfig('firefox')
        // }
        // ,
        // safari: {
        //     browsers: getBrowserConfig('safari')
        // }
    },
    'name': 'frontEnd Tests'
};

exports.config = setupConfig;
