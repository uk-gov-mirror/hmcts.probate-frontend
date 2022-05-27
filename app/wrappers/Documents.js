'use strict';
const caseTypes = require('app/utils/CaseTypes');
const DeceasedWrapper = require('./Deceased');

class Documents {
    constructor(formdata) {
        this.formdata = formdata || {};
        this.deceasedData = this.formdata.deceased || {};
        this.ihtData = this.formdata.iht || {};
        this.applicantData = this.formdata.applicant || {};
        this.deceasedWrapper = new DeceasedWrapper(this.deceasedData);
    }

    documentsSent() {
        return this.formdata.sentDocuments === 'true';
    }

    documentsRequired() {
        if (this.formdata.caseType === caseTypes.GOP) {
            return true;
        }
        let documentsRequired = true;
        const deceasedMarried = this.deceasedWrapper.hasMarriedStatus();
        const applicantIsChild = this.applicantData.relationshipToDeceased === 'optionChild' || this.applicantData.relationshipToDeceased === 'optionAdoptedChild';

        if (this.intestacyDocScreeningConditionsMet(deceasedMarried, applicantIsChild)) {
            const iht400Used = ((this.ihtData.method === 'optionPaper' && this.ihtData.form === 'optionIHT400421') || (this.ihtData.ihtFormEstateId === 'optionIHT400421'));
            const deathCert = this.deceasedWrapper.hasDeathCertificate();
            const exceptedEstate = this.ihtData.estateValueCompleted === 'optionNo';
            documentsRequired = !((iht400Used && deathCert) || (exceptedEstate && deathCert));
        }

        const iht205Used = this.ihtData.method === 'optionPaper' && this.ihtData.form === 'optionIHT205';
        const interimDeathCert = this.deceasedWrapper.hasInterimDeathCertificate();
        const foreignDeathCert = this.deceasedWrapper.hasForeignDeathCertificate();
        return (deceasedMarried && applicantIsChild) || iht205Used || interimDeathCert || foreignDeathCert || documentsRequired;
    }

    intestacyDocScreeningConditionsMet(deceasedMarried, applicantIsChild) {
        const anyOtherChildren = this.deceasedWrapper.hasAnyOtherChildren();
        const allChildrenOver18 = this.deceasedWrapper.hasAllChildrenOver18();
        const anyDeceasedChildren = this.deceasedWrapper.hasAnyDeceasedChildren();
        const anyGrandchildrenUnder18 = this.deceasedWrapper.hasAnyGrandChildrenUnder18();

        if (deceasedMarried && this.applicantData.relationshipToDeceased === 'optionSpousePartner') {
            return true;
        }

        if ((!deceasedMarried && applicantIsChild) && anyOtherChildren && allChildrenOver18 && anyDeceasedChildren && !anyGrandchildrenUnder18) {
            return true;
        }

        if ((!deceasedMarried && applicantIsChild) && anyOtherChildren && allChildrenOver18 && !anyDeceasedChildren) {
            return true;
        }

        if ((!deceasedMarried && applicantIsChild) && !anyOtherChildren) {
            return true;
        }

        return false;
    }
}

module.exports = Documents;
