import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

//ng2-CHarts
import { ChartsModule } from 'ng2-charts';

import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { ProfileComponent } from './profile/profile.component';

import { PipesModule } from '../pipes/pipes.module';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RjxsComponent,
        ProfileComponent,
        UsuariosComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,         
        SharedModule,
    ],
    imports: [
        PAGES_ROUTES,
        CommonModule,
        FormsModule,
        ChartsModule,
        SharedModule,
        PipesModule,
    ]
})
export class PagesModule { }