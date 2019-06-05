(function(root) {
    root.__8x8Chat = {
        onInit: function(bus) {
            bus.publish('chat:set-system-messages', {
                chatEstablishedName: 'You are now chatting with {{agent}}. Please type in the window below to start your chat.',
                pullDownInfo: 'Click for options',
                endChatNotification: 'Chat session has been ended.',
                endChatConfirmation: 'Are you sure you want to end this chat conversation?',
                agentDisconnected: 'This conversation has now ended, please contact us again if you have any further questions.'
            });
        }
    };

    jQuery(document).ready(function() {
        jQuery('div').on('DOMNodeInserted', '.form-list', function() {
            jQuery('div').off('DOMNodeInserted', '.form-list');

            const form = document.getElementsByClassName('form-list')[0];
            const fields = form.getElementsByTagName('li');

            Array.from(fields).forEach(function(item) {
                const newSpan = document.createElement('span');
                const label = item.getElementsByTagName('label')[0];

                if (label) {
                    const labelNodes = label.childNodes;

                    for (let i=0; i<labelNodes.length; i++) {
                        if (labelNodes[i].nodeType === Node.TEXT_NODE) {
                            newSpan.appendChild(document.createTextNode(labelNodes[i].nodeValue));
                            label.replaceChild(newSpan, labelNodes[i]);
                        }
                    }
                }
            });
        });
    });
})(this);
