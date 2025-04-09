import { defineStore } from 'pinia';
import portfolio_json from "@/portfolio.json";

export const useMainStore = defineStore('main', {
    state: () => ({
        data: {
            portfolio : portfolio_json
        }
    }),
    actions: {
    }
});