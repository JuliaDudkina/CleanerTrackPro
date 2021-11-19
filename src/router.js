import {createRouter, createWebHistory} from "vue-router";
import MainList from "./components/MainList";
import ClientsList from "./components/clients/ClientsList";
import AddClient from "./components/clients/AddClient";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainList},
        {
            path: '/clients',
            component: ClientsList,
            children: [
                {path: 'register', component: AddClient},
            ],
        },
        {path: '/worksites', component: null},
        {path: '/employees', component: null},
        {path: '/equipment', component: null},
        {path: '/jobs', component: null},
    ]
});

export default router;