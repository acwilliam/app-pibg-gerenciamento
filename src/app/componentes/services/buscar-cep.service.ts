import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../model/cep';

@Injectable({
  providedIn: 'root'
})
export class BuscarCepService {
  private apiUrl = 'https://viacep.com.br/ws/';

  constructor(private http: HttpClient) {}

  buscar(cep: string): Observable<Cep> {
    const url = `${this.apiUrl}${cep}/json/`;
    return this.http.get<Cep>(url);
  }
}
