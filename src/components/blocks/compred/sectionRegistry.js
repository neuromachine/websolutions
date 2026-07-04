import Hero from "@/components/blocks/compred/presentation/hero.vue";
import Calc from "@/components/Calc.vue";
import Benefits from "@/components/blocks/compred/presentation/benefits.vue";
import About from "@/components/blocks/compred/presentation/about.vue";
import Packages from "@/components/blocks/compred/presentation/packages.vue";
import Includes from "@/components/blocks/compred/presentation/includes.vue";
import Important from "@/components/blocks/compred/presentation/important.vue";
import ReelsSystem from "@/components/blocks/compred/presentation/reels_system.vue";
import Extras from "@/components/blocks/compred/presentation/extras.vue";
import Acticle from "@/components/blocks/compred/presentation/content.vue";
import IvoryCoast from "@/components/blocks/compred/presentation/ivorycoast.vue";
import Portfolio from "@/components/blocks/portfolio/index.vue";

export const compredSections = [
    {
        key: 'hero',
        order: 10,
        component: Hero,
        getProps: (properties, context) => ({ 
            data: properties.hero, 
            svgkey: context.item?.block?.key || context.item?.key 
        }),
        isRenderable: (properties) => Boolean(properties.hero)
    },
    {
        key: 'calc',
        order: 20,
        component: Calc,
        getProps: () => ({}),
        isRenderable: () => true
    },
    {
        key: 'benefits',
        order: 30,
        component: Benefits,
        getProps: (properties) => ({ data: properties.benefits }),
        isRenderable: (properties) => Boolean(properties.benefits)
    },
    {
        key: 'about',
        order: 40,
        component: About,
        getProps: (properties, context) => ({ scope: context.scope }),
        isRenderable: () => true
    },
    {
        key: 'packages',
        order: 50,
        component: Packages,
        getProps: (properties) => ({ data: properties.items }),
        getListeners: (context) => ({ 'open-chat': context.openChat }),
        isRenderable: (properties) => Boolean(properties.items)
    },
    {
        key: 'includes',
        order: 60,
        component: Includes,
        getProps: (properties) => ({ items: properties.includes }),
        isRenderable: (properties) => Boolean(properties.includes)
    },
    {
        key: 'important',
        order: 70,
        component: Important,
        getProps: (properties) => ({ data: properties.important }),
        isRenderable: (properties) => Boolean(properties.important)
    },
    {
        key: 'reelsSystem',
        order: 80,
        component: ReelsSystem,
        getProps: (properties) => ({ data: properties.reelsSystem }),
        isRenderable: (properties) => Boolean(properties.reelsSystem)
    },
    {
        key: 'extras',
        order: 90,
        component: Extras,
        getProps: (properties) => ({ data: properties.extras }),
        isRenderable: (properties) => Boolean(properties.extras)
    },
    {
        key: 'acticle',
        order: 100,
        component: Acticle,
        getProps: (properties) => ({ data: properties.acticle }),
        isRenderable: (properties) => Boolean(properties.acticle)
    },
    {
        key: 'ivorycoast',
        order: 110,
        component: IvoryCoast,
        getProps: () => ({}),
        isRenderable: (properties, context) => {
            const key = context.item?.block?.key || context.item?.key;
            return key === 'ivorycoast';
        }
    },
    {
        key: 'portfolio',
        order: 120,
        component: Portfolio,
        getProps: () => ({}),
        isRenderable: () => true
    }
];
