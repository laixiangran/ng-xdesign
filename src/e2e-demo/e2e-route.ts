import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonE2EComponent } from './button/button-e2e';

const routes: Routes = [
    { path: '', redirectTo: 'button', pathMatch: 'full' },
    { path: 'button', component: NbButtonE2EComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class E2ERouterModule {}
