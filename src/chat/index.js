import { tidioTracker } from '../chat/tidio'
export const chat = {
    async init(currentScope = 'en') {
        await tidioTracker.init(currentScope);
    },
    open: () => tidioTracker.open(),
    close: () => tidioTracker.close(),
    identify: (userData) => tidioTracker.identify(userData)
};