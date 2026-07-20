let tidioLoaded = false;
let tidioScript = null;

export const tidioTracker = {
    async init(currentScope = 'en') {
        if (tidioLoaded) return;

        return new Promise((resolve) => {
            tidioScript = document.createElement('script');
            tidioScript.src = '//code.tidio.co/2wed0llapvtm39nz9utqqaz65keeeoog.js';
            tidioScript.async = true;

            tidioScript.onload = () => {
                tidioLoaded = true;
                console.info('✅ Tidio chat loaded');
                resolve();
            };

            tidioScript.onerror = () => {
                console.warn('❌ Failed to load Tidio');
                resolve();
            };

            document.head.appendChild(tidioScript);
        });
    },

    refreshLanguage() {
        if (window.tidioChatApi) {
            // Tidio автоматически подхватит новый lang при следующем взаимодействии
            console.info('🔄 Tidio language refresh triggered')
        }
    },

    // Пример методов из Widget SDK Tidio (можно расширять)
    open() {
        if (window.tidioChatApi) window.tidioChatApi.open();
    },

    close() {
        if (window.tidioChatApi) window.tidioChatApi.close();
    },

    // Пример: идентификация пользователя после авторизации
    identify(userData) {
        if (window.tidioChatApi) {
            window.tidioChatApi.setVisitorData(userData); // или .identify()
        }
    }
};