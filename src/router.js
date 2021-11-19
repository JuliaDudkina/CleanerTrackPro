import {createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: null},
        {path: '/clients', component: null},
        {path: '/worksites', component: null},
        {path: '/employees', component: null},
        {path: '/equipment', component: null},
        {path: '/jobs', component: null},
    ]
});

export default router;