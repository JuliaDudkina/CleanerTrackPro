import {createRouter, createWebHistory} from "vue-router";
import MainList from "./components/MainList";
import ClientsList from "./components/clients/ClientsList";
import Auth from "./components/Auth";
import EmployeesList from "./components/employees/EmployeesList";
import AddEmployee from "./components/employees/AddEmployee";
import AddClient from "./components/clients/AddClient";
import AddEquipment from "./components/equipment/AddEquipment";
import EquipmentList from "./components/equipment/EquipmentList";
import JobsList from "./components/jobs/JobsList";
import AddJob from "./components/jobs/AddJob";
import WorksitesList from "./components/worksites/WorksitesList";
import AddWorksite from "./components/worksites/AddWorksite";
import UpdateClient from "./components/clients/UpdateClient";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import UpdateEquipment from "./components/equipment/UpdateEquipment";
import UpdateWorksite from "./components/worksites/UpdateWorksite";
import UpdateJob from "./components/jobs/UpdateJob";
import store from "./store";
import ClientWorksites from "./components/clients/ClientWorksites";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainList},
        {path: '/clients', component: ClientsList, meta:{requiresAuth: true}},
        {path: '/clients/register', component: AddClient, meta:{requiresAuth: true}},
        {path: '/clients/update', component: UpdateClient, meta:{requiresAuth: true}},
        {path: '/clients/worksites', component: ClientWorksites, meta:{requiresAuth: true}},
        {path: '/jobs', component: JobsList, meta:{requiresAuth: true}},
        {path: '/jobs/register', component: AddJob, meta:{requiresAuth: true}},
        {path: '/jobs/update', component: UpdateJob, meta:{requiresAuth: true}},
        {path: '/employees', component: EmployeesList, meta:{requiresAuth: true}},
        {path: '/employees/register', component: AddEmployee, meta:{requiresAuth: true}},
        {path: '/employees/update', component: UpdateEmployee, meta:{requiresAuth: true}},
        {path: '/equipment', component: EquipmentList, meta:{requiresAuth: true}},
        {path: '/equipment/register', component: AddEquipment, meta:{requiresAuth: true}},
        {path: '/equipment/update', component: UpdateEquipment, meta:{requiresAuth: true}},
        {path: '/worksites', component: WorksitesList, meta:{requiresAuth: true}},
        {path: '/worksites/register', component: AddWorksite, meta:{requiresAuth: true}},
        {path: '/worksites/update', component: UpdateWorksite, meta:{requiresAuth: true}},
        {path: '/auth', component: Auth, meta:{requiresUnAuth: true}},
    ]
});

router.beforeEach(function (to,from,next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated ){
        next('/auth');
    } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
        next('/');
    } else {
        next();
    }
});

export default router;