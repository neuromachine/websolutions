import { defineStore } from 'pinia';
import portfolio_json from "@/portfolio.json";
import sourceData from '@/data.json';

export const useMainStore = defineStore('main', {
    state: () => ({
        data: {
            portfolio : portfolio_json,
            services: sourceData,
        }
    }),
    actions: {
    },
    getters: {
        getServiceBySlug: (state) => (slug) => {
            return state.data.services.find((service) => service.slug === slug);
        },
    },
});