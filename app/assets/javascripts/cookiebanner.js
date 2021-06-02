        /*  This callback is called when the 'accept' action is fired within the cookie banner
        *   This is where you'd hide the first stage in a decision/confirmation style banner
        */
        const bannerAcceptCallback = function () {
            document.querySelector('.cm-cookie-banner__decision').hidden = true;
            document.querySelector('.cm-cookie-banner__confirmation').hidden = false;
        }

        /*  This callback is called when the 'reject' action is fired within the cookie banner
        *   This is where you'd hide the first stage in a decision/confirmation style banner
        */
        const bannerRejectCallback = function () {
            document.querySelector('.cm-cookie-banner__decision').hidden = true;
            document.querySelector('.cm-cookie-banner__confirmation').hidden = false;
        }

        /*  This callback is called when the banner save action is fired within the cookie banner (caused by accepting or rejecting).
        *   This is where you'd likely call a method to that would programmatically remove or add the
        *   consent-required scripts/tags back onto the page.
        */
        const bannerSaveCallback = function (cookieStatus) {
            updateConsent(cookieStatus);
        }

        /*  This callback is called when the save action is fired within the preference form (caused by saving the form).
        *   This is where you'd likely call a method to that would programmatically remove or add the
        *   consent-required scripts/tags back onto the page.
        */
        const preferenceFormSaveCallBack = function (cookieStatus) {
            updateConsent(cookieStatus);
        }

        /*  This is where you'd perform logic regarding granting or denying the injection
        *   of cookies, scripts and tags that required consent. This callback is called
        *   with an object containing the current cookie preferences.
        */
        const updateConsent = function (cookieStatus) {
            // Google Tag Manager Analytics Consent
            const gtag = window.gtag || function () {
                dataLayer.push(arguments);
            };
            if (cookieStatus.analytics === 'on') {
                gtag('consent', 'update', {'analytics_storage': 'granted'});
            } else {
                gtag('consent', 'update', {'analytics_storage': 'denied'});
            }            // Dynatrace RUM Consent
            const dtrum = window.dtrum;
            if (cookieStatus.apm === 'on') {
                dtrum.enable();
                dtrum.enableSessionReplay();
            } else {
                dtrum.disableSessionReplay();
                dtrum.disable();
            }
        }

        /*  This is where you configure the initial settings of the cookieManager and list the cookies that you
        *   expect to appear on the site, and their subsequent categories and optionality.
        */
        const cookieManagerConfig = {
        "preference-form-id": "cookie-manager-form",
        "user-preference-cookie-name": "cm-user-preferences",
        "preference-form-saved-callback": preferenceFormSaveCallBack,
        "cookie-banner-id": "cm-cookie-banner",
        "cookie-banner-visible-on-page-with-preference-form": true,
        "cookie-banner-auto-hide": false,
        "cookie-banner-accept-callback": bannerAcceptCallback,
        "cookie-banner-reject-callback": bannerRejectCallback,
        "cookie-banner-save-callback": bannerSaveCallback,
        "cookie-manifest": [
            {
                "category-name": "essential",
                "optional": false,
                "cookies": [
                    "cm-user-preferences"
                ]
            },
            {
                "category-name": "analytics",
                "optional": true,
                "cookies": [
                    "_ga",
                    "_gtm"
                ]
            },
            {
                'category-name': 'apm',
                'optional': true,
                'cookies': [
                    'dtCookie',
                    'dtLatC',
                    'dtPC',
                    'dtSa',
                    'rxVisitor',
                    'rxvt'
                ]
            }
        ]
    };

    /*  Initializes the cookie manager with the provided settings */
    cookieManager.init(cookieManagerConfig);
