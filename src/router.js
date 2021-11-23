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

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: MainList},
        {path: '/clients', component: ClientsList},
        {path: '/clients/register', component: AddClient},
        {path: '/clients/update', component: UpdateClient},
        {path: '/jobs', component: JobsList},
        {path: '/jobs/register', component: AddJob},
        {path: '/employees', component: EmployeesList},
        {path: '/employees/register', component: AddEmployee},
        {path: '/employees/update', component: UpdateEmployee},
        {path: '/equipment', component: EquipmentList},
        {path: '/equipment/register', component: AddEquipment},
        {path: '/equipment/update', component: UpdateEquipment},
        {path: '/worksites', component: WorksitesList},
        {path: '/worksites/register', component: AddWorksite},
        {path: '/worksites/update', component: UpdateWorksite},
        {path: '/auth', component: Auth},
    ]
});

export default router;