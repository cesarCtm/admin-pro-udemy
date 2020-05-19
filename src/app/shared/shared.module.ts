import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModelUploadComponent } from '../components/model-upload/model-upload.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        NoPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModelUploadComponent
    ],
    exports: [
        NoPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModelUploadComponent
    ]
})
export class SharedModule{ }