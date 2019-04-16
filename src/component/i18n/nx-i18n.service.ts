import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import zh_CN from './languages/zh_CN';
import { NxI18nInterface } from './nx-i18n.interface';
import { NX_I18N } from './nx-i18n.token';
import { IndexableObject } from '../core/indexable';

@Injectable({
  providedIn: 'root'
})
export class NxI18nService {
  private _locale: NxI18nInterface;
  private _change = new BehaviorSubject<NxI18nInterface>(this._locale);

  get localeChange(): Observable<NxI18nInterface> {
    return this._change.asObservable();
  }

  constructor(@Inject(NX_I18N) locale: NxI18nInterface) {
    this.setLocale(locale || zh_CN);
  }

  // [NOTE] Performance issue: this method may called by every change detections
  // TODO: cache more deeply paths for performance
  /* tslint:disable-next-line:no-any */
  translate(path: string, data?: any): string {
    // this._logger.debug(`[NzI18nService] Translating(${this._locale.locale}): ${path}`);
    let content = this._getObjectPath(this._locale, path) as string;
    if (typeof content === 'string') {
      if (data) {
        Object.keys(data).forEach(key => (content = content.replace(new RegExp(`%${key}%`, 'g'), data[key])));
      }
      return content;
    }
    return path;
  }

  /**
   * Set/Change current locale globally throughout the WHOLE application
   * [NOTE] If called at runtime,
   * rendered interface may not change along with the locale change (because this do not trigger another render schedule)
   * @param locale The translating letters
   */
  setLocale(locale: NxI18nInterface): void {
    if (this._locale && this._locale.locale === locale.locale) {
      return;
    }
    this._locale = locale;
    this._change.next(locale);
  }

  getLocale(): NxI18nInterface {
    return this._locale;
  }

  getLocaleId(): string {
    return this._locale ? this._locale.locale : '';
  }

  // tslint:disable-next-line:no-any
  private _getObjectPath(obj: IndexableObject, path: string): string | object | any {
    let res = obj;
    const paths = path.split('.');
    const depth = paths.length;
    let index = 0;
    while (res && index < depth) {
      res = res[paths[index++]];
    }
    return index === depth ? res : null;
  }
}
