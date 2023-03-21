import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../modelo/persona';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private url = 'http://localhost:8080/api/persona/';

  constructor(private http: HttpClient) {}

  public registrar(persona: Persona) {
    return this.http.post<string>(this.url + 'registrar', persona);
  }

  public listar() {
    return this.http.get<Persona[]>(this.url + 'listarTodo');
  }

  public listarPorId(id: number) {
    return this.http.get<Persona>(this.url + 'listar/' + id);
  }

  public actualizar(persona: Persona, id: number) {
    return this.http.put<void>(this.url + 'editar/' + id, persona);
  }

  public eliminar(id: number) {
    return this.http.delete<string>(this.url + 'eliminar/' + id);
  }
}
