'use strict';

const {JSDOM} = require('jsdom');

class LegalDocumentJSONObjectBuilder {

    build(formdata, html) {
        const dom = new JSDOM(html);
        const $ = (require('jquery'))(dom.window);
        const legalDeclaration = {};
        legalDeclaration.headers = [];
        legalDeclaration.sections = [];
        const sections = $('.declaration-header, .declaration-subheader, .declaration-item, .list-bullet');

        let section;
        let declarationItem;
        for (const sectElement of sections) {
            const $element = $(sectElement);
            if ($element.hasClass('declaration-header')) {
                legalDeclaration.headers.push($element.html());
            } else if ($element.hasClass('declaration-subheader')) {
                section = this.buildSection(section, $element);
                legalDeclaration.sections.push(section);
            } else if ($element.hasClass('declaration-item')) {
                declarationItem = {};
                declarationItem.title = $element.html();
                section.declarationItems.push(declarationItem);
            } else if ($element.hasClass('list-bullet')) {
                declarationItem.values = [];
                const children = $element.children();
                if (children.length > 0) {
                    for (const statement of children) {
                        declarationItem.values.push(statement.textContent);
                    }
                }
            }
        }
        legalDeclaration.dateCreated = new Date().toLocaleString();
        legalDeclaration.deceased = formdata.deceased.deceasedName;
        return legalDeclaration;
    }

    buildSection(section, $element) {
        section = {};
        if ($element.hasClass('heading-medium') || $element.hasClass('heading-large')) {
            section.headingType = 'large';
        } else {
            section.headingType = 'small';
        }
        section.title = $element.html();
        section.declarationItems = [];
        return section;
    }
}

module.exports = LegalDocumentJSONObjectBuilder;
