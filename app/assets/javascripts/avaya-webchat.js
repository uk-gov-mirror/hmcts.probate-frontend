(function() {
    /**
     * When a user clicks the 'Hide' button on the chat client,
     * an event is dispatched on the web-chat component.
     * To listen for this event, we use the addEventListener DOM API
     * and register a callback.
     */

    const button = document.querySelector('.chat-button');
    const webChat = document.querySelector('web-chat');

    if(button && webChat){
        button.addEventListener('click', () => {
            webChat.classList.remove('hidden');
        });

        webChat.addEventListener('hide', () => {
            webChat.classList.add('hidden');
        });
    }
}).call(this);
