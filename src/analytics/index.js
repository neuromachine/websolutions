import { ymTracker } from './trackers/ym'
// TODO: make Google analytics
// import { gaTracker } from './trackers/ga'
//const trackers = [ymTracker, gaTracker]
const trackers = [ymTracker]
export const analytics = {
    hit(to) {
        trackers.forEach(t => t.hit?.(to))
    },
    goal(to) {
        trackers.forEach(t => t.goal?.(to))
    }
}