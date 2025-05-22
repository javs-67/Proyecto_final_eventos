import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private baseUrl = 'http://tu-api-url.com/api/eventos';  // Cambia por la URL real de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener el conteo de eventos por tipo
  getConteoEventosPorTipo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/conteo-eventos-por-tipo/`);
  }

}
