import { EventEmitter, Injectable } from '@angular/core';

import { ApiService } from '../services/service';

@Injectable()
export class UserService {
  private ticker: EventEmitter<string> = new EventEmitter();

  constructor(private _apiService: ApiService) {}

  public logIn(
    clientId: any,
    userInfo: any,
    sid: any,
    sessionId: any,
    lang: any
  ) {
    sessionStorage.setItem('clientId', clientId);
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    sessionStorage.setItem('sid', sid);
    sessionStorage.setItem('lang', lang);
    sessionStorage.setItem('accountNum', userInfo.CdAccount);
    sessionStorage.setItem('sessionId', sessionId);

    localStorage.setItem('clientId', clientId);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    // localStorage.setItem('sid', sid);
    localStorage.setItem('lang', lang);
    localStorage.setItem('accountNum', userInfo.CdAccount);
    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('sid', sid);
  }
  CheckClientDirectProxy(login: any, password: any, lang: any) {
    return this._apiService.get(
      this.getCheckClientDirectProxyUrl(login, password, lang)
    );
  }
  private getCheckClientDirectProxyUrl(login: any, password: any, lang: any) {
    return (
      'checkClientDirectProxy?login=' +
      this.EscapeXml(login) +
      '&password=' +
      this.EscapeXml(password) +
      '&lang=' +
      lang
    );
  }
  getClientData(clientId: any, sid: any, lang: any) {
    return this._apiService.get(
      this.getGetClientDataUrl(clientId, '', sid, lang)
    );
  }
  private getGetClientDataUrl(
    clientId: any,
    demoMode: any,
    sid: any,
    lang: any
  ) {
    return (
      'getClientData?clientId=' +
      clientId +
      '&demoMode=' +
      demoMode +
      '&sid=' +
      sid +
      '&lang=' +
      lang
    );
  }
  getClientDataPost(json: any) {
    return this._apiService.rawPost(this.getGetClientDataPostUrl(), json);
  }
  getAuthPost(json: any) {
    return this._apiService.rawPost(this.getAuthPostUrl(), json);
  }
  private getAuthPostUrl() {
    return 'Auth';
  }
  private getGetClientDataPostUrl() {
    return 'getClientDataPost';
  }
  CheckClientDirectProxy2(
    login: any,
    sid: any,
    passwordOld: any,
    passwordNew: any,
    passwordNew2: any,
    lang: any
  ) {
    return this._apiService.get(
      this.getCheckClientDirectProxyUrl2(
        this.EscapeXml(login),
        sid,
        this.EscapeXml(passwordOld),
        this.EscapeXml(passwordNew),
        this.EscapeXml(passwordNew2),
        lang
      )
    );
  }
  private getCheckClientDirectProxyUrl2(
    login: any,
    sid: any,
    passwordOld: any,
    passwordNew: any,
    passwordNew2: any,
    lang: any
  ) {
    return `changePasswordDirectProxy?login=${login}&oldPassword=${passwordOld}&newPassword1=${passwordNew}&newPassword2=${passwordNew2}&sid=${sid}&lang=${lang}`;
  }
  EscapeXml(s: string) {
    // replace literal values with entities
    s = s.replace('&', '==amp;');
    s = s.replace("'", '==apos;');
    s = s.replace('"', '==quot;');
    s = s.replace('>', '==gt;');
    s = s.replace('<', '==lt;');
    s = s.replace('@', '==sbk;');
    s = s.replace('%', '==perc;');
    s = s.replace('*', '==star;');
    return s;
  }
  public logOut() {
    //localStorage.setItem('clientId', null);
    sessionStorage.removeItem('clientId');
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('sid');
    sessionStorage.removeItem('lang');
    sessionStorage.removeItem('journalStartDate');
    sessionStorage.removeItem('dealStartDate');
    sessionStorage.removeItem('paymentEndDate');
    sessionStorage.removeItem('paymentStartDate');

    localStorage.removeItem('clientId');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('sid');
    localStorage.removeItem('lang');
    this.closeAllStakan('all');
    localStorage.setItem('sid', '');
    localStorage.removeItem('sid');
  }
  public closeAllStakan(string: any) {
    this.ticker.emit(string);
  }
  public getcloseAllStakan(): EventEmitter<string> {
    return this.ticker;
  }
  public getPhone() {
    let userInfo: any = localStorage.getItem('userInfo');
    return JSON.parse(userInfo).mobilePhone;
  }
  public setUserInfo(userInfo: any) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
  public getClientId() {
    return localStorage.getItem('clientId');
  }
  public getSessionId() {
    return localStorage.getItem('sessionId');
  }
  public getLang() {
    return localStorage.getItem('lang');
  }
  public getAccountNum() {
    return localStorage.getItem('accountNum');
  }
  public getSID() {
    let sid: any = '';
    sid = localStorage.getItem('sid');
    return sid;
  }
  public getUserInfo() {
    let userInfo: any = localStorage.getItem('userInfo');
    return JSON.parse(userInfo);
  }

  public isLoggedIn() {
    if (
      localStorage.getItem('clientId') === null ||
      localStorage.getItem('clientId') == ''
    ) {
      return false;
    }
    return true;
  }

  public getNominalnyDerjatel() {
    let userInfo: any = localStorage.getItem('userInfo');
    let brokerName: any = JSON.parse(userInfo).brokerName;
    return brokerName;
  }
}
