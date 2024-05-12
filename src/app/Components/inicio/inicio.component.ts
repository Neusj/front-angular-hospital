import { Component, OnInit, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PacienteService } from '../../Services/paciente.service';
import { Paciente } from '../../Models/Paciente';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatTableModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',

})
export class InicioComponent implements OnInit{
  private paciente_service = inject(PacienteService);
  public lista_pacientes:Paciente[] = [];
  public displayColumns:string[] = ['rut', 'nombre', 'edad', 'sexo'];

  getPacientes(){
    this.paciente_service.get_all().subscribe({
      next:(data) => {
        if (data.length > 0){
          this.lista_pacientes = data.slice(0, 5); // muestra solo los primeros 5 registros
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  constructor(private router:Router){}
}
