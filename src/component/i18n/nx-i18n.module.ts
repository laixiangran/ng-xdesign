import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxI18nPipe } from './nx-i18n.pipe';
import { NX_I18N } from './nx-i18n.token';

@NgModule({
  declarations: [NxI18nPipe],
  exports: [NxI18nPipe],
  providers: [DatePipe, { provide: NX_I18N, useValue: null }]
})
export class NxI18nModule {}
