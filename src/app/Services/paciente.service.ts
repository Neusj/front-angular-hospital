import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appSettings } from './appSettings';
import { Paciente } from '../Models/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private http = inject(HttpClient);
  private apiUrl:string = appSettings.apiUrl;
  constructor() { }

  get_all(){
    return this.http.get<Paciente[]>(`${this.apiUrl}getAll`);
  }

  get_by_id(id:string){    
    return this.http.get<Paciente>(`${this.apiUrl}getById/${id}`);
  }

  get_custom(search:string){    
    return this.http.get<Paciente[]>(`${this.apiUrl}getCustom${search}`);
  }

  create(paciente:Paciente){    
    return this.http.post<Paciente>(`${this.apiUrl}add`,paciente);
  }

  update(paciente:Paciente){
    return this.http.put<Paciente>(`${this.apiUrl}update/${paciente._id}`,paciente);
  }

  delete(id:string){
    return this.http.delete<Paciente>(`${this.apiUrl}delete/${id}`);
  }
}
