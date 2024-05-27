import { Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/CI/account/account.component';
import { SettingsComponent } from './pages/CI/settings/settings.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { RegisterComponent } from './pages/Register/register/register.component';
import { MaterialComponent } from './pages/Material/material/material.component';

export const routes: Routes =
[
    {
        path: '',
        component: LoginComponent
    },  
    
    {
        path: 'Navigation',
        component: NavigationComponent,
        children:[
            {
                path:'',
                component:EmptyComponent
            },
            {
                path: 'ACCOUNT',
                component: AccountComponent
            },
            {
                path: 'MATERIAL',
                component: MaterialComponent
            },
            {
                path: 'SETTINGS',
                component:SettingsComponent
            },
        ]

    },
    {
        path: 'register',
        component: RegisterComponent
    },
];

