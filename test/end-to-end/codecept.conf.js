const testConfig = require('config');

exports.config = {
    tests: testConfig.TestPathToRun,
    output: testConfig.TestOutputDir,
    helpers: {
        Puppeteer: {
            url: testConfig.TestE2EFrontendUrl,
            waitForTimeout: 120000,
            getPageTimeout: 120000,
            show: testConfig.TestShowBrowser,
            chrome: {
                ignoreHTTPSErrors: true,
                'ignore-certificate-errors': true,
                defaultViewport: {
                    width: 1280,
                    height: 960
                },
                args: [
                    '--no-sandbox',
                    '--proxy-server=proxyout.reform.hmcts.net:8080',
                    '--proxy-bypass-list=*beta*LB.reform.hmcts.net',
                    '--window-size=1440,1400'
                ]
            },
        },
        PuppeteerHelper: {
            require: './helpers/PuppeteerHelper.js'
        },
        JSWait: {
            require: './helpers/JSWait.js'
        },
        IDAMHelper: {
            require: './helpers/IDAMHelper.js'
        }
    },
    include: {
        I: './pages/steps.js'
    },
    plugins: {
        autoDelay: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true
        }
    },
    multiple: {
        parallel: {
            // Splits tests into 2 chunks
            chunks: 2
        }
    },
    mocha: {
        reporterOptions: {
            'codeceptjs-cli-reporter': {
                stdout: '-',
                options: {steps: true}
            },
            'mocha-junit-reporter': {
                stdout: '-',
                options: {mochaFile: './foutput/result.xml'}
            },
            mochawesome: {
                stdout: './output/console.log',
                options: {
                    reportDir: testConfig.TestOutputDir || './output',
                    reportName: 'index',
                    inlineAssets: true
                }
            }
        }
    },
    name: 'Probate FE Tests'
};
