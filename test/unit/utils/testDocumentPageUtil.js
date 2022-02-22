'use strict';

const expect = require('chai').expect;
const DocumentPageUtil = require('app/utils/DocumentPageUtil');

describe('DocumentPageUtil.js', () => {
    describe('setCheckListItem()', () => {
        it('should return correctly formatted text only checkListItem', (done) => {
            const textOnlyContent = 'Some text with no links';
            const link = null;
            expect(DocumentPageUtil.setCheckListItem(textOnlyContent, link)).to.deep.equal({text: 'Some text with no links', type: 'textOnly'});
            done();
        });

        it('should return correctly formatted text with link checkListItem', (done) => {
            const textWithLinkContent = 'Some text BEFORE the link <a href="{someLinkPlaceholder}" target="_blank">Text in the link</a> Some text AFTER the link';
            const link = 'http://example-link.com';
            expect(DocumentPageUtil.setCheckListItem(textWithLinkContent, link)).to.deep.equal(
                {
                    text: 'Text in the link',
                    type: 'textWithLink',
                    url: link,
                    beforeLinkText: 'Some text BEFORE the link ',
                    afterLinkText: ' Some text AFTER the link'
                });
            done();
        });

        it('should return correctly formatted text with link checkListItem with no before link text', (done) => {
            const textWithLinkContent = '<a href="{someLinkPlaceholder}" target="_blank">Text in the link</a> Some text AFTER the link';
            const link = 'http://example-link.com';
            expect(DocumentPageUtil.setCheckListItem(textWithLinkContent, link)).to.deep.equal(
                {
                    text: 'Text in the link',
                    type: 'textWithLink',
                    url: link,
                    beforeLinkText: '',
                    afterLinkText: ' Some text AFTER the link'
                });
            done();
        });

        it('should return correctly formatted text with link checkListItem with no after link text', (done) => {
            const textWithLinkContent = 'Some text BEFORE the link <a href="{someLinkPlaceholder}" target="_blank">Text in the link</a>';
            const link = 'http://example-link.com';
            expect(DocumentPageUtil.setCheckListItem(textWithLinkContent, link)).to.deep.equal(
                {
                    text: 'Text in the link',
                    type: 'textWithLink',
                    url: link,
                    beforeLinkText: 'Some text BEFORE the link ',
                    afterLinkText: ''
                });
            done();
        });
    });
});
