import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Components } from './models/componentsDB';
import { Store } from '@ngrx/store';
import { PcbViewActionsType } from './actions/pcbview.actions';

import * as fromPcbview from './reducers';

import 'rxjs/add/operator/map';

@Injectable()
export class PcbviewService {

  private api_url = 'http://localhost:3500/components';
  private headers = new HttpHeaders( {'Content-Type': 'application/json'} );

  constructor(private http: HttpClient) {
  }

  getComponents(): Observable<Components[]> {
    const url = `${this.api_url}/`;
    return this.http
               .get(url)
               .map( res => res as Components[] );
  }
}
