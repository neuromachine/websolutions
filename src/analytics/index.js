// import { ymTracker } from './trackers/ym'
import { gaTracker } from './trackers/ga'
//const trackers = [ymTracker, gaTracker]
const trackers = [gaTracker]
export const analytics = {
    hit(to) {
        trackers.forEach(t => t.hit?.(to))
    },
    goal(to) {
        trackers.forEach(t => t.goal?.(to))
    }
}