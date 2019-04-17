import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { en_US, zh_Hans, zh_Hant } from './languages';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private _localeId: string;
  private _change = new BehaviorSubject<string>(this._localeId);

  get localeChange(): Observable<string> {
    return this._change.asObservable();
  }

  constructor(@Inject(LOCALE_ID) localeId: string, private translate: TranslateService) {
    this.setTranslations();
    this.setLocaleId(localeId || 'zh-Hans');
  }

  setTranslations() {
    this.translate.setTranslation('en-US', en_US);
    this.translate.setTranslation('zh-Hans', zh_Hans);
    this.translate.setTranslation('zh-Hant', zh_Hant);
  }

  setLocaleId(localeId: string): void {
    if (this._localeId && this._localeId === localeId) {
      return;
    }
    this._localeId = localeId;
    this.translate.use(localeId);
    this._change.next(localeId);
  }

  getCurrentLocaleId(): string {
    return this._localeId;
  }

  getLocaleIds(): string[] {
    return this.translate.getLangs();
  }
}
