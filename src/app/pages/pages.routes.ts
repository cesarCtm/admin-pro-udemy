import { Routes, RouterModule } from "@angular/router";
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const pagesRoutes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },  
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'} },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'} },
            { path: 'rxjs', component: RjxsComponent, data: { titulo: 'RxJs'} },            
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de la Pagina'} },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
            //mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios'} },
            { path: '', pathMatch:'full', redirectTo: '/dashboard' },
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );