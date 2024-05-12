import { Component, OnInit, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { PacienteService } from '../../Services/paciente.service';
import { Paciente } from '../../Models/Paciente';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-listar-registros',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './listar-registros.component.html',
  styleUrl: './listar-registros.component.css',

})
export class ListarRegistros implements OnInit{
  private paciente_service = inject(PacienteService);
  public lista_pacientes:Paciente[] = [];
  public displayColumns:string[] = ['rut', 'nombre', 'edad', 'sexo', 'accion'];

  getPacientes(){
    this.paciente_service.get_all().subscribe({
      next:(data) => {
        if (data.length > 0){
          this.lista_pacientes = data;
        }
      },
      error:(err) => {
        console.log(err.message);
      }
    })
  }

  ngOnInit(): void {}

  constructor(private router:Router){
    this.getPacientes();
  }

  update(obj:Paciente){    
    this.router.navigate(['/registro/actualizar', obj._id])
  }

  ver_mas(obj:Paciente){    
    this.router.navigate(['/registro/detalle', obj._id])
  }

  delete(obj:Paciente){
    if(confirm('Desea eliminar al paciente '+ obj.nombre)){
      const idPaciente = obj._id ? obj._id : '' 
      this.paciente_service.delete(idPaciente).subscribe({
        next:(data) => {
          this.getPacientes();
        },
        error:(err) => {
          console.log(err.message);
        }
      })
    }
  }
}
