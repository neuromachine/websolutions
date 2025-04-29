import { defineStore } from 'pinia';
import portfolio_json from "@/portfolio.json";
import sourceData from '@/data.json';
import servicesData from '@/data/services.json';
// import servicesData from '@/data/services_v0.2.json';
import pagesData from '@/data/pages.json';
import { slugify } from '@/utils/slugify'
import { extractTitle } from '@/utils/extractTitle'

let idCounter = 0
function generateId() {
    return `srv-${++idCounter}`
}

function mapServicesToTree(data) {
    return Object.entries(data).map(([topLevelKey, topLevelValue]) => {
        const topSlug = slugify(topLevelKey)

        return {
            id: generateId(),
            raw: topLevelKey,
            title: extractTitle(topLevelKey),
            slug: topSlug,
            icon: topSlug, // можно будет использовать в компоненте как `icon-${slug}`
            thumb: `${topSlug}.png`,
            images: [],
            childs: Object.entries(topLevelValue).map(([secondLevelKey, secondLevelValue]) => {
                const secondSlug = slugify(secondLevelKey)

                return {
                    id: generateId(),
                    raw: secondLevelKey,
                    title: extractTitle(secondLevelKey),
                    slug: secondSlug,
                    icon: secondSlug,
                    thumb: `${secondSlug}.png`,
                    images: [],
                    childs: secondLevelValue.map(thirdLevelItem => {
                        const thirdSlug = slugify(thirdLevelItem)

                        return {
                            id: generateId(),
                            raw: thirdLevelItem,
                            title: extractTitle(thirdLevelItem),
                            slug: thirdSlug,
                            icon: thirdSlug,
                            thumb: `${thirdSlug}.png`,
                            images: [],
                            childs: null
                        }
                    })
                }
            })
        }
    })
}

export const useMainStore = defineStore('main', {
    state: () => ({
        data: {
            portfolio : portfolio_json,
            services: sourceData,
            pages: pagesData,
            tree: mapServicesToTree(servicesData),
        }
    }),
    actions: {
    },
    getters: {
        getOwnerTree: (state) => (slug) => {
            const root = state.data.tree.find(item => item.slug === slug);
            if (!root) return [];

            return root.childs || [];
        },
        getServiceBySlug: (state) => (slug) => {
            return state.data.services.find((service) => service.slug === slug);
        },
        getPageBySlug: (state) => (slug) => {
            const returnObj = state.data.pages.find((item) => item.slug === slug);
            if(typeof returnObj === 'undefined') {
                console.log('-NOT FOUND:',slug)
              return  state.data.pages.find((item) => item.slug === 'error-404');
            }
            return returnObj
        },
        geyServicesTree: (state) => (inputJson) => {
            //return mapServicesToTree(inputJson)
            return state.data.tree
        },
        // TODO: getServiceData LEGACY?
        getServiceData: (state) => (input) => {
            // console.log(input);
           return {
                id: 1000000000,
                title: "Ресурс не найден",
                descr: '<p>Раздел в стадии наполнения</p>',
                slug: '404'
            }
        }
    },
});