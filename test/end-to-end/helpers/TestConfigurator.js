'use strict';

const randomstring = require('randomstring');
const request = require('request');
const testConfig = require('test/config');

/* eslint no-console: 0 no-unused-vars: 0 */
/* eslint-disable no-undef */
class TestConfigurator {

    constructor() {
        this.testBaseUrl = testConfig.TestIdamBaseUrl;
        this.useIdam = testConfig.TestUseIdam;
        this.setTestCitizenName();
        this.testCitizenDomain = testConfig.TestCitizenDomain.replace('/@', '@');
        this.setTestCitizenPassword();
        this.testAddUserUrl = testConfig.TestIdamAddUserUrl;
        this.testDeleteUserUrl = this.testAddUserUrl + '/';
        this.role = testConfig.TestIdamRole;
        this.testIdamUserGroup = testConfig.TestIdamUserGroup;
        this.paymentEnvironments = testConfig.paymentEnvironments;
        this.TestE2EFrontendUrl = testConfig.TestE2EFrontendUrl;
        this.useGovPay = testConfig.TestUseGovPay;
        this.userDetails = '';
        this.useSidam = testConfig.TestUseSidam;
        this.retryScenarios = testConfig.TestRetryScenarios;
        this.testUserForename = testConfig.TestNewUserForename;
        this.testUserSurname = testConfig.TestNewUserSurname;
        this.testUserPassword = testConfig.TestNewUserPassword;
        this.testUserGroupName = testConfig.TestNewUserGroupName;
        this.testCreateUserURL = testConfig.TestCreateUserURL;
        this.testReformProxy = testConfig.TestReformProxy;
        this.testInjectFormDataURL = testConfig.TestInjectFormDataURL;
    }

    getBefore() {

        if (process.env.testCitizenEmail === this.getTestCitizenEmail()) {
            this.setTestCitizenName();
            this.setTestCitizenPassword();
        }

        this.setEnvVars();

        if (this.useIdam === 'true') {

            if (this.useSidam === 'true') {
                this.userDetails =
                    {
                        'email': this.getTestCitizenEmail(),
                        'forename': this.getTestCitizenName(),
                        'surname': this.getTestCitizenName(),
                        'password': this.getTestCitizenPassword(),
                        'roles': [{'code': this.getTestRole()}],
                        'userGroup': {'code': this.getTestIdamUserGroup()}
                    };

            } else {
                this.userDetails =
                    {
                        'email': this.getTestCitizenEmail(),
                        'forename': this.getTestCitizenName(),
                        'surname': this.getTestCitizenName(),
                        'user_group_name': this.getTestRole(),
                        'password': this.getTestCitizenPassword()
                    };
            }

            request({
                url: this.getTestAddUserURL(),
                method: 'POST',
                json: true, // <--Very important!!!
                body: this.userDetails
            });
        }

    }

    getAfter() {
        // if (this.useIdam === 'true') {
        //     request({
        //             url: this.getTestDeleteUserURL() + process.env.testCitizenEmail,
        //             method: 'DELETE'
        //         }
        //     );

        //     this.resetEnvVars();
        // }
    }

    setTestCitizenName() {
        this.testCitizenName = randomstring.generate({
            length: 36,
            charset: 'alphabetic'
        });
    }

    getTestCitizenName() {
        return this.testCitizenName;
    }

    getTestCitizenPassword() {
        return this.testCitizenPassword;
    }

    setTestCitizenPassword() {
        const letters = randomstring.generate({length: 5, charset: 'alphabetic'});
        const captiliseFirstLetter = letters.charAt(0).toUpperCase();

        this.testCitizenPassword = captiliseFirstLetter + letters.slice(1) + randomstring.generate({length: 4, charset: 'numeric'});
    }

    getTestRole() {
        return this.role;
    }

    getTestIdamUserGroup() {
        return this.testIdamUserGroup;
    }

    getTestCitizenEmail() {
        return this.testCitizenName + this.testCitizenDomain;
    }

    getTestAddUserURL() {
        return this.testBaseUrl + this.testAddUserUrl;
    }

    getTestDeleteUserURL() {
        return this.testBaseUrl + this.testDeleteUserUrl;
    }

    idamInUseText(scenarioText) {
        return (this.useIdam === 'true') ? scenarioText + ' - With Idam' : scenarioText + ' - Without Idam';
    }

    setEnvVars() {
        process.env.testCitizenEmail = this.getTestCitizenEmail();
        process.env.testCitizenPassword = this.getTestCitizenPassword();
    }

    resetEnvVars() {
        process.env.testCitizenEmail = null;
        process.env.testCitizenPassword = null;
    }

    getUseGovPay() {
        return this.useGovPay;
    }

    getRetryScenarios() {
        return this.retryScenarios;
    }

    createAUser(emailId) {
        const myJSONObject = {
            email: emailId,
            forename: this.testUserForename,
            surname: this.testUserSurname,
            password: this.testUserPassword,
            user_group_name: this.testUserGroupName
        };

        request(
            {
                url: this.testCreateUserURL,
                method: 'POST',
                headers: {'content-type': 'application/json'},
                proxy: this.testReformProxy,
                json: true,
                body: myJSONObject
            },
            function (error, response, body) {
                // console.log(emailId);
            });
    }

    injectFormData(data, emailId) {
        const formData =
            {
                id: emailId,
                formdata: {
                    payloadVersion: '4.1.0',
                    applicantEmail: emailId,
                }
            };
        Object.assign(formData.formdata, data);
        request({
            url: this.testInjectFormDataURL,
            method: 'POST',
            headers: {'content-type': 'application/json', 'Session-Id': emailId},
            proxy: this.testReformProxy,
            socksProxyHost: 'localhost',
            socksProxyPort: '9090',
            json: true,
            body: formData
        },
        function (error, response, body) {
            console.log('This is email id ' + emailId);
        });
    }
}

module.exports = TestConfigurator;
