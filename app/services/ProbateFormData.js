'use strict';

const dateformat = require('dateformat');
const FormData = require('./FormData');

class ProbateFormData extends FormData {

    get(id, authToken, serviceAuthorisation) {
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Get probate form data';
        const url = this.endpoint + path +'?probateType='+this.getFormType();

        return super.get(logMessage, url, authToken, serviceAuthorisation);
    }

    post(id, data, ctx) {
        data.type = this.getFormType();
        const path = this.replaceEmailInPath(this.config.services.orchestrator.paths.forms, id);
        const logMessage = 'Post probate form data';
        const url = this.endpoint + path;
        console.log(JSON.stringify(data));
        return super.post(this.formatForPost(data), logMessage, url, ctx);
    }

    getFormType() {
        return 'PA';
    }

    formatForPost(formdata){
        formdata.deceased.dod_date = dateformat(formdata.deceased.dod_date, 'yyyy-mm-dd');
        formdata.deceased.dob_date = dateformat(formdata.deceased.dob_date, 'yyyy-mm-dd');
        console.log("Formatted POST formdata: " + JSON.stringify(formdata));
        return formdata;
    }

    formatForGet(formdata){
        const dod =  new Date(formdata.deceased.dod_date);
        formdata.deceased.dod_date = dod;
        formdata.deceased.dod_day = dod.getDate();
        formdata.deceased.dod_month = dod.getMonth() + 1;
        formdata.deceased.dod_year = dod.getFullYear();

        const dob =  new Date(formdata.deceased.dob_date);
        formdata.deceased.dob_date = dob;
        formdata.deceased.dob_day = dob.getDate();
        formdata.deceased.dob_month = dob.getMonth() + 1;
        formdata.deceased.dob_year = dob.getFullYear();
        console.log("Formatted GET formdata: " + JSON.stringify(formdata));
        return formdata;
    }
}

module.exports = ProbateFormData;
