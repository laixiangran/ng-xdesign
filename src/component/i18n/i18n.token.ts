import { InjectionToken } from '@angular/core';

import { NbI18nInterface } from './i18n.interface';

export const NB_I18N = new InjectionToken<NbI18nInterface | string>('nb-i18n');
