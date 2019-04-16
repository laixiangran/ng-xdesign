import { Pipe, PipeTransform } from '@angular/core';

import { NxI18nService } from './nx-i18n.service';

@Pipe({
  name: 'nxI18n'
})
export class NxI18nPipe implements PipeTransform {
  constructor(private _locale: NxI18nService) {}

  transform(path: string, keyValue?: object): string {
    return this._locale.translate(path, keyValue);
  }
}
