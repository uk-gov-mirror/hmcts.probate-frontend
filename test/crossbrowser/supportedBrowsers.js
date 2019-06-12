const supportedBrowsers = {
    microsoftIE11: {
        ie11: {
            browserName: 'internet explorer',
            name: 'Probate_IE11_Win10',
            platform: 'Windows 10',
            version: '11.285'
        },
        microsoftEdge: {
            edge: {
                browserName: 'MicrosoftEdge',
                name: 'Probate_EDGE_Win10',
                platform: 'Windows 10',
                version: '18.17763'
            }
        },
        chrome: {
            chrome_win_latest: {
                browserName: 'chrome',
                name: 'Probate_WIN_CHROME_LATEST',
                platform: 'Windows 10',
                version: 'latest'
            },
            chrome_mac_latest: {
                browserName: 'chrome',
                name: 'Probate_MAC_CHROME_LATEST',
                platform: 'macOS 10.13',
                version: 'latest'
            }
        },
        firefox: {
            firefox_win_latest: {
                browserName: 'firefox',
                name: 'Probate_WIN_FIREFOX_LATEST',
                platform: 'Windows 10',
                version: 'latest'
            },
            firefox_mac_latest: {
                browserName: 'firefox',
                name: 'Probate_MAC_FIREFOX_LATEST',
                platform: 'macOS 10.14',
                version: 'latest'
            }
        }
    }
};

module.exports = supportedBrowsers;
