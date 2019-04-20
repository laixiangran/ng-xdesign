/**
 * @file 路由配置
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import { Routes } from '@angular/router';
import { GuideComponentDemo } from './docs';
import { IconsComponentDemo } from './icons';
import { I18nComponentDemo } from './i18n';
import { TypographyDemo } from './typography';
import { ButtonDemo } from './button';

export const appRoutes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'start' },
    { path: 'start', component: GuideComponentDemo },
    { path: 'icons', component: IconsComponentDemo },
    { path: 'i18n', component: I18nComponentDemo },
    { path: 'typography', component: TypographyDemo },
    { path: 'components', pathMatch: 'full', redirectTo: 'components/button' },
    { path: 'components/button', component: ButtonDemo },
];
