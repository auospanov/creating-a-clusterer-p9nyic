import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Injectable()
export class ApiService {
  private ticker: EventEmitter<string> = new EventEmitter();
  private miniStock: EventEmitter<string> = new EventEmitter();
  private typeGlass: EventEmitter<string> = new EventEmitter();
  headers: Headers = new Headers({
    'Content-Type': 'text/plain',
    Accept: 'application/json;charset=UTF-8',
  });
  //https://mobile.enpf.kz/restService/mobileservice/generic/getFilialList/filialKnd=16&lang=0
  //api_url: string = 'https://backend.logistic-point.kz/elevator/';
  api_url: string = 'https://mobile.enpf.kz/restService/mobileservice/generic/getFilialList/';
  //api_url: string = 'http://localhost:5000/elevator/';
  constructor(private titleService: Title, private http: HttpClient) {}

  private getJson(response: Response) {
    return response.json();
  }

  private getRawJson(response: Response) {
    return response.json();
  }

  private getData(response: Response) {
    return response;
  }

  get(path: string): Observable<any> {
    var url = `${this.api_url}${path}`;
    //alert(url);
    return this.http.get(url);
    // .map(this.checkForError)
    // .catch(err => this.parseError(err))
    // .map(this.getJson)
  }

  post(path: string, body: any): Observable<any> {
    return this.http.post(`${this.api_url}${path}`, JSON.stringify(body));
    // .map(this.checkForError)
    // .catch(err => this.parseError(err))
    // .map(this.getJson)
  }

  rawGet(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}`);
    // .catch(err => this.parseError(err))
    // .map(this.getRawJson)
  }

  rawPost(path: string, body: any): Observable<any> {
    console.log(`${this.api_url}${path}`);
    console.log(body);
    return this.http.post(
      `${this.api_url}${path}`,
      //JSON.stringify(body),
      body
    );
    // .catch(err => this.parseError(err))
    // .map(this.getRawJson)
  }

  postDownload(path: string, body: any): Observable<any> {
    return this.http.post(`${this.api_url}${path}`, JSON.stringify(body));
    // .catch(err => this.parseError(err))
    // .map(this.getData)
  }

  setHeaders(headers: any) {
    Object.keys(headers).forEach((header) =>
      this.headers.set(header, headers[header])
    );
  }
  removeHeaders(name: any) {
    this.headers.delete(name);
  }
  public getShortGlass(
    accountNum: string,
    ticker: string,
    source: string,
    board: string,
    sid: string,
    typeGlass: string
  ): Observable<any> {
    return this.http.get(
      `${this.api_url}getGlassSingle?accountNum=${accountNum}&ticker=${ticker}&source=${source}&board=${board}&sid=${sid}&typeGlass=${typeGlass}`
    );
  }
  private getUsersUrl() { 
    return 'GetUsers';
  }
  getFilials() {
    return this.get(this.getFilialsUrl());
  }
  getChilds(id) {
    return this.get(this.getChildUrl(id)); 
  }
  private getFilialsUrl() {
    return 'filialKnd=-1&lang=0';
  }
  private getChildUrl(id) {
    return `filialKnd=${id}&lang=0`;
  }
}
