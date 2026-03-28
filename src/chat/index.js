import { tidioTracker } from '../chat/tidio'
export const chat = {
    async init() {
        await tidioTracker.init();
    },
    open: () => tidioTracker.open(),
    close: () => tidioTracker.close(),
    identify: (userData) => tidioTracker.identify(userData)
};