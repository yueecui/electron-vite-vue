import type { App } from 'vue';
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import MainLayout from '../layout/MainLayout.vue';
import SecondLayout from '../layout/SecondLayout.vue';
import MainPage from '../views/MainPage.vue';
import { createRouterGuards } from './guards';

const getRouteModules = () => {
    const modules = import.meta.glob<true, string, any>('./modules/**/*.ts', { eager: true });
    let list: RouteRecordRaw[] = [];
    Object.keys(modules).forEach((key) => {
        const mod = modules[key].default || {};
        const modList = Array.isArray(mod) ? [...mod] : [mod];
        list.push(...modList);
    });
    // list = filterByAdmin(list);
    // list.sort((a, b) => {
    //     return (a.meta?.menuOrder || 0) - (b.meta?.menuOrder || 0);
    // });
    return list;
};

const getRouter = () => {
    const routeMoudles = getRouteModules();

    return createRouter({
        history: createWebHashHistory(),
        routes: [
            {
                path: '/',
                name: 'main',
                redirect: '/home',
                component: MainLayout,
                meta: {
                    title: '首页',
                },
                children: [
                    {
                        path: '/home',
                        name: 'home',
                        component: MainPage,
                    },
                ],
            },
            {
                path: '/second',
                name: 'second',
                component: SecondLayout,
                meta: {
                    title: '第二个路由',
                },
            },
            // ...routeMoudles,
            // {
            //     path: '/:pathMatch(.*)',
            //     redirect: '/',
            // },
        ],
    });
};

let router: Router | null = null;

export const setupRouter = async (appInstance: App) => {
    router = getRouter();
    appInstance.use(router);
    createRouterGuards(router);
};

export { router };
