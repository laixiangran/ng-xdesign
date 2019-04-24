import { Injectable, Optional, Inject } from '@angular/core';
import localeObj from './languages';
import { BehaviorSubject, Observable } from 'rxjs';
import { NB_I18N } from './i18n.token';
import { NbI18nInterface } from './i18n.interface';

@Injectable({
  providedIn: 'root',
})
export class NbI18nService {
  private _locale: NbI18nInterface;
  private _change = new BehaviorSubject<any>(this._locale);

  constructor(@Optional() @Inject(NB_I18N) locale: NbI18nInterface | string) {
    let initLocale = localeObj['zh-Hans'];
    if (locale) {
      if (typeof locale === 'string') {
        initLocale = localeObj[locale];
      } else {
        initLocale = locale;
        localeObj[locale.localeId] = locale;
      }
    }
    this.setLocale(initLocale);
  }

  /**
   * 语言代码改变事件
   */
  get localeChange(): Observable<any> {
    return this._change.asObservable();
  }

  /**
   * 设置语言代码
   * @param localeId 语言代码。基于[BCP47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt)
   */
  setLocaleId(localeId: string): void {
    if (this._locale.localeId === localeId) {
      return;
    }
    this._locale = localeObj[localeId];
    this._change.next(this._locale);
  }

  /**
   * 获取语言代码
   */
  getLocaleId(): string {
    return this._locale.localeId;
  }

  /**
   * 设置国际化文案
   */
  setLocale(locale: NbI18nInterface): any {
    this._locale = locale;
  }

  /**
   * 获取国际化文案
   */
  getLocale(): any {
    return this._locale;
  }

  /**
   * 获取属于注册的语言代码
   */
  getLocaleIds(): string[] {
    return Object.keys(localeObj);
  }
}
