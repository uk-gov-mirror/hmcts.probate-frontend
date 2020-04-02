'use strict';

class Applicant2NameFactory {

    static getApplicant2Name(formdata, content, ihtThreshold) {
        let applicant2 = '';
        if (formdata.maritalStatus === 'optionMarried') {
            applicant2 = getMarried(formdata, content, ihtThreshold);
        } else {
            applicant2 = getNotMarried(formdata, content);
        }
        return applicant2.replace(/{deceasedName}/g, formdata.deceasedName);
    }
}

const getMarried = (formdata, content, ihtThreshold) => {
    if (formdata.relationshipToDeceased === 'optionSpousePartner') {
        return getSpousePartner(formdata, content, ihtThreshold);
    }
    return getNonSpousePartner(formdata, content, ihtThreshold);
};

const getSpousePartner = (formdata, content, ihtThreshold) => {
    if (formdata.anyChildren === 'optionNo' || formdata.ihtTotalNetValue <= ihtThreshold) {
        return content.intestacyDeceasedMarriedSpouseApplyingHadNoChildrenOrEstateLessThan250k;
    }
    return content.intestacyDeceasedMarriedSpouseApplyingHadChildren;
};

const getNonSpousePartner = (formdata, content, ihtThreshold) => {
    if (formdata.ihtTotalNetValue <= ihtThreshold) {
        return getAnyOtherChildrenBelowThreshold(formdata, content);
    }
    return getAnyOtherChildrenAboveThreshold(formdata, content);
};

const getAnyOtherChildrenBelowThreshold = (formdata, content) => {
    if (formdata.anyOtherChildren === 'optionYes') {
        if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
            return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsAdopted;
        }
        return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsNotAdopted;

    }
    if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
        return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsAdopted;
    }
    return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsNotAdopted;
};

const getAnyOtherChildrenAboveThreshold = (formdata, content) => {
    if (formdata.anyOtherChildren === 'optionYes') {
        if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
            return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsAdopted;
        }
        return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsNotAdopted;

    }
    if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
        return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsAdopted;
    }
    return content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsNotAdopted;
};

const getNotMarried = (formdata, content) => {
    if (formdata.anyOtherChildren === 'optionYes') {
        return getNotMarriedAndOtherChildren(formdata, content);
    }
    return getNotMarriedAndNoOtherChildren(formdata, content);
};

const getNotMarriedAndOtherChildren = (formdata, content) => {
    if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
        return content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsAdopted;
    }
    return content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsNotAdopted;
};

const getNotMarriedAndNoOtherChildren = (formdata, content) => {
    if (formdata.relationshipToDeceased === 'optionAdoptedChild') {
        return content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsAdopted;
    }
    return content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsNotAdopted;
};

module.exports = Applicant2NameFactory;
