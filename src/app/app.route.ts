import { Routes } from '@angular/router';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountComponent } from './pages/CI/account/account.component';
import { SettingsComponent } from './pages/CI/settings/settings.component';
import { EmptyComponent } from './pages/empty/empty.component';

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
            // {
            //     path: 'SALARY',
            //     loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
            // },
            // {
            //     path: 'STORE',
            //     loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
            // },
            // {
            //     path: 'ORDER',
            //     loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
            // },
            // {
            //     path: 'ZOMATO',
            //     loadChildren: './pages/OwnerDetails/app.module#OwnerModule'
            // },
            {
                path: 'SETTINGS',
                component:SettingsComponent
            },
        ]

    },
     {
        path: 'Login',
        component: LoginComponent
    }
];

