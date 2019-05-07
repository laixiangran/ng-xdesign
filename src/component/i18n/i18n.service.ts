import { Injectable, Optional, Inject } from '@angular/core';
import localeObj from './languages';
import { Observable, Subject } from 'rxjs';
import { NB_I18N } from './i18n.token';
import { NbI18nInterface } from './i18n.interface';
import {
  formatDate,
  formatCurrency,
  formatNumber,
  formatPercent,
  getLocaleCurrencySymbol,
  getLocaleDateFormat,
  FormatWidth
} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NbI18nService {
  private _locale: NbI18nInterface = localeObj['zh-Hans'];
  private _change = new Subject();

  constructor(@Optional() @Inject(NB_I18N) locale: NbI18nInterface | string) {
    if (locale) {
      this.setLocale(typeof locale === 'string' ? localeObj[locale] : locale);
    }
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
  setLocaleId(localeId: string) {
    if (this._locale.localeId === localeId) {
      return;
    }
    this.setLocale(localeObj[localeId]);
  }

  /**
   * 获取当前语言代码
   *
   * @returns 当前语言代码
   */
  getLocaleId(): string {
    return this._locale.localeId;
  }

  /**
   * 设置国际化文案
   */
  setLocale(locale: NbI18nInterface) {
    if (!locale) {
      throw 'Please provide the correct NB_I18N!';
    }
    localeObj[locale.localeId] = locale;
    this._locale = locale;
    this._change.next(JSON.parse(JSON.stringify(this._locale)));
  }

  /**
   * 获取当前国际化文案
   *
   * @returns 当前国际化文案
   */
  getLocale(): NbI18nInterface {
    return this._locale;
  }

  /**
   * 获取所有语言代码
   *
   * @returns 所有语言代码
   */
  getLocaleIds(): string[] {
    return Object.keys(localeObj);
  }

  /**
   * 基于区域规则格式化日期
   *
   * @param value 日期、数字（从 UTC 时代以来的毫秒数）或 ISO 字符串 ([https://www.w3.org/TR/NOTE-datetime](https://www.w3.org/TR/NOTE-datetime))
   * @param format 要包含的日期/时间部件。欲知详情，参见 [DatePipe](https://angular.cn/api/common/DatePipe)
   * @param localeId 要使用的本地化格式代码
   * @param timezone 一个时区偏移（比如'+0430'）或标准的 UTC/GMT 或美国大陆时区的缩写。默认为最终用户机器上的本地系统时区
   *
   * @returns 格式化后的日期字符串
   */
  formatDate(
    value: string | number | Date, localeId: string = this._locale.localeId,
    format: string = getLocaleDateFormat(this._locale.localeId, FormatWidth.Medium), timezone?: string): string {
      return formatDate(value, format, localeId, timezone);
  }

  /**
   * 使用区域规则将数字格式化为货币
   *
   * @param value 要格式化为货币的数字
   * @param localeId 要使用的本地化格式代码
   * @param currency 货币的字符串
   * @param currencyCode [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 中的货币代码，比如 USD 表示美元，EUR 表示欧元
   * @param digitsInfo 数字展现的选项，通过如下格式的字符串指定：`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`。
   * - `minIntegerDigits`：在小数点前的最小位数。默认为 1
   * - `minFractionDigits`：小数点后的最小位数。默认为 0
   * - `maxFractionDigits`：小数点后的最大为数，默认为 3
   * 如果没有提供，该数字就会根据 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 规范进行适当的格式化。 比如，加拿大元具有 2 位数字，而智利比索则没有
   *
   * @returns 格式化后的货币字符串
   */
  formatCurrency(
    value: number, localeId: string = this._locale.localeId, currency: any = getLocaleCurrencySymbol(this._locale.localeId),
    currencyCode?: string, digitsInfo?: string): string {
      return formatCurrency(value, localeId, currency, currencyCode, digitsInfo);
  }

  /**
   * 使用区域规则格式化数字
   *
   * @param value 要格式化的数字
   * @param locale 要使用的本地化格式代码
   * @param digitsInfo 数字展现的选项，通过如下格式的字符串指定：`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`。
   * - `minIntegerDigits`：在小数点前的最小位数。默认为 1
   * - `minFractionDigits`：小数点后的最小位数。默认为 0
   * - `maxFractionDigits`：小数点后的最大为数，默认为 3
   *
   * @returns 格式化后的数字字符串
   */
  formatNumber(value: number, locale: string = this._locale.localeId, digitsInfo?: string): string {
    return formatNumber(value, locale, digitsInfo);
  }

  /**
   * 使用区域规则将数字格式化为百分比
   *
   * @param value 要格式化的数字
   * @param locale 要使用的本地化格式代码
   * @param digitsInfo 数字展现的选项，通过如下格式的字符串指定：`{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}`。
   * - `minIntegerDigits`：在小数点前的最小位数。默认为 1
   * - `minFractionDigits`：小数点后的最小位数。默认为 0
   * - `maxFractionDigits`：小数点后的最大为数，默认为 3
   *
   * @returns 格式化后的数字百分比
   */
  formatPercent(value: number, locale: string = this._locale.localeId, digitsInfo?: string): string {
    return formatPercent(value, locale, digitsInfo);
  }
}
