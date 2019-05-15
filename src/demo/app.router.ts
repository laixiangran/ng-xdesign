/**
 * @file 路由配置
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import { Routes } from '@angular/router';
import { StartDemo } from './start';
import { IconsDemo } from './icons';
import { TypographyDemo } from './typography';
import { ButtonDemo } from './button';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'start' },
    { path: 'start', component: StartDemo },
    { path: 'icons', component: IconsDemo },
    { path: 'typography', component: TypographyDemo },
    { path: 'components', pathMatch: 'full', redirectTo: 'components/button' },
    { path: 'components/button', component: ButtonDemo },
];
